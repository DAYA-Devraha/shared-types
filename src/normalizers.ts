import type { CowBackend, Cow, CowGender } from './models.js';

/**
 * Normalize gender from legacy formats to canonical enum.
 * Legacy data may have "Bull", "Cow", undefined, etc.
 * Fallback to 'Male' to satisfy the "gender required" invariant.
 */
export function normalizeGender(raw: unknown): CowGender {
  if (typeof raw !== 'string') return 'Male';
  const lower = raw.toLowerCase();
  if (lower === 'male' || lower === 'bull') return 'Male';
  if (lower === 'female' || lower === 'cow') return 'Female';
  return 'Male';
}

/**
 * Normalize raw API cow to frontend Cow type.
 * Converts arbitrary backend cow shape into the strict Cow interface.
 */
export function normalizeCow(raw: CowBackend | unknown): Cow {
  const cow = raw as Record<string, unknown>;
  return {
    _id: String(cow._id ?? ''),
    cowId: typeof cow.cowId === 'number' ? cow.cowId : undefined,
    name: String(cow.name ?? ''),
    photos: Array.isArray(cow.photos) ? cow.photos : [],
    description: String(cow.description ?? ''),
    calf: !!cow.calf,
    gender: normalizeGender(cow.gender),
    adoptionStatus: !!cow.adoptionStatus,
    sponsorName: typeof cow.sponsorName === 'string' ? cow.sponsorName : null,
    sponsorId: typeof cow.sponsorId === 'string' ? cow.sponsorId : null,
    totalDonated: Number(cow.totalDonated ?? 0),
    donators: Array.isArray(cow.donators) ? cow.donators : [],
    eartag: typeof cow.eartag === 'string' ? cow.eartag : null,
    specialCare: !!cow.specialCare,
    testimonials: !!cow.testimonials,
    youtubeUrl: typeof cow.youtubeUrl === 'string' ? cow.youtubeUrl : null,
    createdAt: typeof cow.createdAt === 'string' ? cow.createdAt : undefined,
    updatedAt: typeof cow.updatedAt === 'string' ? cow.updatedAt : undefined,
  };
}
