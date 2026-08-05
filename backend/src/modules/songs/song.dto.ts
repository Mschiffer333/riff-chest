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