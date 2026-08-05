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
        .min(0, 'Mastery leven muy be between 0 and 5')
        .max(5, 'Mastery level must be between 0 and 5'),

    favorite: z.boolean(),

    genreId: z.uuid(),

    tuningId: z.uuid(),

    guitarId: z.uuid()
});

export type CreateSongDto = z.infer<typeof createSongSchema>;