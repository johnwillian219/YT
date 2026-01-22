// frontend/src/domains/billing/types/billing.types.ts
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: "month" | "year";
  features: string[];
  limits: Record<string, number>;
  isPopular?: boolean;
  stripePriceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  plan: Plan;
  status: "active" | "canceled" | "past_due" | "unpaid" | "trialing";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt?: string;
  trialEndsAt?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "bank_account";
  brand?: string;
  last4?: string;
  expMonth?: number;
  expYear?: number;
  isDefault: boolean;
  createdAt: string;
}

export interface Invoice {
  id: string;
  number: string;
  amountDue: number;
  amountPaid: number;
  status: "draft" | "open" | "paid" | "void" | "uncollectible";
  currency: string;
  invoicePdf?: string;
  hostedInvoiceUrl?: string;
  periodStart: string;
  periodEnd: string;
  createdAt: string;
}

export interface Usage {
  feature: string;
  current: number;
  limit: number;
  resetAt: string;
}

export interface CheckoutSession {
  id: string;
  url: string;
  expiresAt: string;
}

export interface PortalSession {
  url: string;
}

export interface Coupon {
  id: string;
  code: string;
  name: string;
  percentOff?: number;
  amountOff?: number;
  duration: "once" | "repeating" | "forever";
  durationInMonths?: number;
  valid: boolean;
  expiresAt?: string;
}

export interface BillingHistoryItem {
  id: string;
  type: "subscription" | "payment" | "refund" | "credit";
  description: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  createdAt: string;
}
