import { z } from 'zod';
import { filterSongsSchema } from './song.schema.js';

export interface SongResponseDto {
    id: string;
    title: string;
    artist: string;
    difficulty: number;
    mastered: boolean;
    masteryLevel: number;
    favorite: boolean;
    lastPracticed: Date | null;

    guitar: {
        id: string;
        brand: string;
        model: string;
    };

    tuning: {
        id: string;
        name: string;
        notes: string;
    };

    genre: {
        id: string;
        name: string;
    };

    createdAt: Date;
    updatedAt: Date;
}

export interface SongListResponseDto {
    data: SongResponseDto[];

    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export type SongFiltersDto = z.infer<typeof filterSongsSchema>;