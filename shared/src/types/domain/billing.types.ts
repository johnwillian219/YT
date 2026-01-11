export type SubscriptionPlan = "FREE" | "PRO" | "BUSINESS" | "ENTERPRISE";
export type SubscriptionStatus =
  | "ACTIVE"
  | "CANCELED"
  | "PAST_DUE"
  | "UNPAID"
  | "TRIALING";
export type PaymentMethodType = "CARD" | "BANK_TRANSFER" | "PAYPAL";
export type InvoiceStatus =
  | "DRAFT"
  | "OPEN"
  | "PAID"
  | "VOID"
  | "UNCOLLECTIBLE";

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;

  // Stripe IDs
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;

  // Billing period
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt?: Date;

  // Trial
  trialStart?: Date;
  trialEnd?: Date;

  // Limits
  maxChannels: number;
  maxTeamMembers: number;
  maxVideosPerMonth?: number;

  // Features
  features: SubscriptionFeature[];

  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionFeature {
  id: string;
  code: string;
  name: string;
  description: string;
  enabled: boolean;
  limit?: number;
  used?: number;
}

export interface Plan {
  id: string;
  code: SubscriptionPlan;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  trialDays: number;

  // Features included
  features: PlanFeature[];

  // Limits
  limits: {
    channels: number;
    teamMembers: number;
    videosPerMonth?: number;
    storageGB?: number;
    apiCallsPerDay?: number;
  };

  // Stripe
  stripeMonthlyPriceId?: string;
  stripeYearlyPriceId?: string;

  isActive: boolean;
  isPopular: boolean;
  order: number;
}

export interface PlanFeature {
  id: string;
  code: string;
  name: string;
  description: string;
  icon?: string;
}

export interface Invoice {
  id: string;
  userId: string;
  subscriptionId?: string;

  // Stripe
  stripeInvoiceId?: string;
  stripePaymentIntentId?: string;

  // Billing info
  number: string;
  status: InvoiceStatus;
  amount: number;
  currency: string;
  tax: number;
  total: number;

  // Dates
  invoiceDate: Date;
  dueDate?: Date;
  paidAt?: Date;

  // PDF
  pdfUrl?: string;

  // Line items
  lineItems: InvoiceLineItem[];

  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  amount: number;
  quantity: number;
  taxRate?: number;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: PaymentMethodType;
  isDefault: boolean;

  // Card details
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };

  // Stripe
  stripePaymentMethodId?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSubscriptionDto {
  plan: SubscriptionPlan;
  billingCycle: "monthly" | "yearly";
  paymentMethodId?: string;
  couponCode?: string;
}

export interface UpdateSubscriptionDto {
  plan?: SubscriptionPlan;
  billingCycle?: "monthly" | "yearly";
  cancelAtPeriodEnd?: boolean;
}

export interface CreatePaymentMethodDto {
  type: PaymentMethodType;
  token?: string; // Stripe token
  card?: {
    number: string;
    expMonth: number;
    expYear: number;
    cvc: string;
  };
  makeDefault?: boolean;
}

export interface BillingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface TaxInfo {
  taxId?: string;
  vatNumber?: string;
  companyName?: string;
}

export interface Coupon {
  id: string;
  code: string;
  name: string;
  description?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  currency?: string;
  maxUses?: number;
  usedCount: number;
  validFrom: Date;
  validUntil?: Date;
  isActive: boolean;
  minAmount?: number;
  plans: SubscriptionPlan[];
}

// Pricing tiers
export const PRICING_TIERS = {
  FREE: {
    priceMonthly: 0,
    priceYearly: 0,
    channels: 3,
    teamMembers: 1,
    features: ["basic_analytics", "3_channels"],
  },
  PRO: {
    priceMonthly: 29,
    priceYearly: 290, // 2 months free
    channels: 10,
    teamMembers: 3,
    features: ["advanced_analytics", "ai_titles", "seo_tools"],
  },
  BUSINESS: {
    priceMonthly: 99,
    priceYearly: 990, // 2 months free
    channels: 50,
    teamMembers: 10,
    features: ["team_collab", "api_access", "priority_support"],
  },
  ENTERPRISE: {
    priceMonthly: 299,
    priceYearly: 2990, // 2 months free
    channels: "unlimited",
    teamMembers: "unlimited",
    features: ["custom_solutions", "dedicated_support", "sla"],
  },
} as const;
