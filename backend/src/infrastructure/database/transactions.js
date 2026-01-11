import { prisma, executeWithRetry } from "./client.js";

/**
 * Execute a transaction with automatic retry
 */
export const transaction = async (operations, options = {}) => {
  const { maxRetries = 3, isolationLevel = "Serializable" } = options;

  return executeWithRetry(async () => {
    return prisma.$transaction(operations, {
      isolationLevel,
      maxWait: 5000, // 5 seconds
      timeout: 10000, // 10 seconds
    });
  }, maxRetries);
};

/**
 * Execute operations in a transaction with a custom callback
 */
export const withTransaction = async (callback, options = {}) => {
  return prisma.$transaction(async (tx) => {
    return await callback(tx);
  }, options);
};

/**
 * Batch operations helper
 */
export const batchOperations = {
  // Create multiple records
  createMany: async (model, data, batchSize = 1000) => {
    const results = [];

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      const result = await prisma[model].createMany({
        data: batch,
        skipDuplicates: true,
      });
      results.push(result);
    }

    return results;
  },

  // Update multiple records
  updateMany: async (model, updates) => {
    const operations = updates.map((update) =>
      prisma[model].update({
        where: update.where,
        data: update.data,
      })
    );

    return transaction(operations);
  },

  // Delete multiple records
  deleteMany: async (model, ids) => {
    return prisma[model].deleteMany({
      where: {
        id: { in: ids },
      },
    });
  },
};

/**
 * Optimistic concurrency control helper
 */
export const optimisticUpdate = async (
  model,
  id,
  updateFn,
  versionField = "version"
) => {
  let retries = 3;

  while (retries > 0) {
    try {
      return await withTransaction(async (tx) => {
        // Get current record with version
        const current = await tx[model].findUnique({
          where: { id },
          select: { [versionField]: true },
        });

        if (!current) {
          throw new Error("Record not found");
        }

        // Apply update function
        const updateData = await updateFn(current);

        // Update with version check
        return tx[model].update({
          where: {
            id,
            [versionField]: current[versionField],
          },
          data: {
            ...updateData,
            [versionField]: { increment: 1 },
          },
        });
      });
    } catch (error) {
      if (error.code === "P2025" && retries > 1) {
        // Optimistic lock failure, retry
        retries--;
        continue;
      }
      throw error;
    }
  }
};

/**
 * Pagination helper
 */
export const paginate = async (model, query = {}, options = {}) => {
  const {
    page = 1,
    limit = 20,
    sortBy = "createdAt",
    sortOrder = "desc",
    include,
    select,
  } = options;

  const skip = (page - 1) * limit;
  const take = limit;

  const [items, total] = await Promise.all([
    prisma[model].findMany({
      where: query.where,
      skip,
      take,
      orderBy: { [sortBy]: sortOrder },
      include,
      select,
    }),
    prisma[model].count({ where: query.where }),
  ]);

  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrev,
    },
  };
};

/**
 * Soft delete helper (if models have deletedAt field)
 */
export const softDelete = async (model, id) => {
  return prisma[model].update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
};

/**
 * Restore soft deleted record
 */
export const restore = async (model, id) => {
  return prisma[model].update({
    where: { id },
    data: {
      deletedAt: null,
    },
  });
};

export default {
  transaction,
  withTransaction,
  batchOperations,
  optimisticUpdate,
  paginate,
  softDelete,
  restore,
};
