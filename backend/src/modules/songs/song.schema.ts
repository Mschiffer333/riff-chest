import { z } from 'zod';

export const createSongSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'Title is required')
        .max(150, 'Title is too long'),

    artist: z
        .string()
        .trim()
        .min(1, 'Artist is required')
        .max(100, 'Artist is too long'),

    difficulty: z
        .number()
        .int()
        .min(1, 'Difficulty must be between 1 and 5')
        .max(5, 'Difficulty must be between 1 and 5'),

    masteryLevel: z
        .number()
        .int()
        .min(0, 'Mastery level must be between 0 and 5')
        .max(5, 'Mastery level must be between 0 and 5'),

    favorite: z.boolean(),

    genreId: z.uuid(),

    tuningId: z.uuid(),

    guitarId: z.uuid()
});

export const filterSongsSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),

    sort: z
        .enum([
            'title',
            'artist',
            'difficulty',
            'masteryLevel',
            'createdAt'
        ])
        .default('createdAt'),
    order: z
        .enum(['asc', 'desc'])
        .default('desc'),

    title: z.string().optional(),

    artist: z.string().optional(),

    favorite: z
        .string()
        .transform((value) => value === 'true')
        .optional(),

    mastered: z
        .string()
        .transform((value) => value === 'true')
        .optional(),

    difficulty: z.coerce.number().optional(),

    genreId: z.string().uuid().optional(),
    tuningId: z.string().uuid().optional(),
    guitarId: z.string().uuid().optional()
});

export type CreateSongDto = z.infer<typeof createSongSchema>;