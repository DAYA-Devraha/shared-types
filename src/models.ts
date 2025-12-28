/**
 * Shared model type definitions for DAYA-Devraha frontends
 */

/**
 * User model - represents an authenticated user
 * Used in: kamdhenuseva-frontend, daya-home
 */
export interface User {
  id: string; // mapped from _id
  userId?: number; // 7-digit human ID
  email: string;
  name: string | null;
  twoFactorEnabled: boolean;
  isVerified: boolean;
  dateOfBirth?: string | null; // ISO string or null
  emergencyRecoveryContact?: string | null;
}

/**
 * Admin model - represents an admin user
 * Used in: daya-home, dayadevraha-admin-frontend
 */
export interface Admin {
  id: string;
  email: string;
  name: string;
  twoFactorEnabled?: boolean;
  isVerified: boolean;
  dateOfBirth?: string;
}

/**
 * Cow gender type - normalized to 'Male' | 'Female'
 * Legacy data may have "Bull", "Cow", etc. - normalize on client
 */
export type CowGender = 'Male' | 'Female';

/**
 * Cow model - represents a cow in the system
 * Used in: kamdhenuseva-frontend
 */
export interface Cow {
  _id: string;
  cowId?: number; // optional until backfill is complete
  name: string;
  photos?: string[];
  description: string;
  calf: boolean;
  gender: CowGender;
  adoptionStatus: boolean;
  sponsorName?: string | null;
  sponsorId?: string | null;
  eartag?: string | null;
  specialCare: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Raw cow shape as it comes from the API
 * Gender may be in various formats from legacy data
 */
export interface CowBackend {
  _id: string;
  cowId?: number;
  name: string;
  photos?: string[];
  description: string;
  calf: boolean;
  gender?: string; // will normalize to CowGender
  adoptionStatus: boolean;
  eartag?: string | null;
  specialCare: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Donation status types
 */
export type DonationStatus = 'Pending' | 'Successful' | 'Failed';

/**
 * Donation type - cow or ashram
 */
export type DonationType = 'cow' | 'ashram';

/**
 * Donation model - represents a donation transaction
 * Used in: kamdhenuseva-frontend
 */
export interface Donation {
  _id: string;
  user: string;
  cowId?: Cow;
  amount: number;
  status: DonationStatus;
  paymentId?: string;
  transactionDetails?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
  donationType: DonationType;
}

/**
 * Legacy donation format (from authStore)
 */
export interface LegacyDonation {
  _id: string;
  user: string;
  amount: number;
  tier: 'Bronze' | 'Silver' | 'Gold';
  donationType: 'one-time' | 'recurring';
  recurringFrequency?: 'monthly' | 'quarterly' | 'yearly';
  transactionDetails?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Puja order status types
 */
export type PujaOrderStatus =
  | 'AwaitingPayment'
  | 'SuccessfulPayment'
  | 'DateConfirmed'
  | 'Completed'
  | 'Failed'
  | 'Cancelled'
  // legacy / UI pipeline states still referenced in frontend
  | 'PendingApproval'
  | 'Processed';

/**
 * Puja order customer information
 */
export interface PujaCustomer {
  name: string;
  email: string;
  phone: string; // +91XXXXXXXXXX
}

/**
 * Puja order details
 */
export interface PujaDetails {
  gotra: string;
  sankalpam: string;
  preferredDate?: string | Date;
  namesToInclude?: string;
  additionalNotes?: string;
}

/**
 * Puja order model - represents a puja booking
 * Used in: kamdhenuseva-frontend
 */
export interface PujaOrder {
  _id: string;
  orderId: string;
  paymentId?: string;
  userId: string;
  amount: number;
  currency: 'INR';
  status: PujaOrderStatus;
  customer: PujaCustomer;
  pujaDetails: PujaDetails;
  scheduledDate?: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}
