import { SongRepository } from "./song.repository.js";
import { NotFoundError } from "../../shared/errors/not-found-error.js";
import type { Prisma } from '@prisma/client';
import type { SongResponseDto } from "./song.dto.js";
import type { CreateSongDto } from "./song.schema.js";

type SongWithRelations = Prisma.SongGetPayload<{
  include: {
    guitar: true;
    tuning: true;
    genre: true;
  };
}>;

export class SongService {
  constructor(
      private readonly repository = new SongRepository(),
  ) {}

  async create(data: CreateSongDto): Promise<SongResponseDto> {
    const song = await this.repository.create({
      ...data,
      mastered: data.masteryLevel === 5,
    });
    return this.toSongResponseDto(song);
  }

  async getAll(): Promise<SongResponseDto[]> {
    const songs = await this.repository.findAll();
    return songs.map((song: SongWithRelations) => this.toSongResponseDto(song));
  }

  async getById(id: string): Promise<SongResponseDto> {
    const song = await this.repository.findById(id);

    if (!song) {
      throw new NotFoundError('Song not found');
    }
    return this.toSongResponseDto(song);
  }

  async update(
    id: string,
    data: CreateSongDto,
  ): Promise<SongResponseDto> {
    const existingSong = await this.repository.findById(id);

    if (!existingSong) {
      throw new NotFoundError('Song not found');
    }

    const updatedSong = await this.repository.update(id, {
      ...data,
      mastered: data.masteryLevel === 5,
    });
    return this.toSongResponseDto(updatedSong);
  }

  async delete(id: string): Promise<void> {
    const existingSong = await this.repository.findById(id);

    if (!existingSong) {
      throw new NotFoundError('Song not found');
    }
    await this.repository.delete(id);
  }

  private toSongResponseDto(song: SongWithRelations): SongResponseDto {
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