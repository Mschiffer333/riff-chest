import { SongRepository } from "./song.repository.js";
import type { SongResponseDto } from "./song.dto.js";
import type { CreateSongDto } from "./song.schema.js";

export class SongService {
    constructor(
        private readonly repository = new SongRepository(),
    ) {}

    async create(data: CreateSongDto): Promise<SongResponseDto> {
    const song = await this.repository.create({
      ...data,
      mastered: data.masteryLevel === 5,
    });

    return {
      id: song.id,
      title: song.title,
      artist: song.artist,
      difficulty: song.difficulty,
      mastered: song.mastered,
      masteryLevel: song.masteryLevel,
      favorite: song.favorite,
      lastPracticed: song.lastPracticed,

      guitar: {
        id: song.guitar.id,
        brand: song.guitar.brand,
        model: song.guitar.model,
      },

      tuning: {
        id: song.tuning.id,
        name: song.tuning.name,
        notes: song.tuning.notes,
      },

      genre: {
        id: song.genre.id,
        name: song.genre.name,
      },

      createdAt: song.createdAt,
      updatedAt: song.updatedAt,
    };
  }
}