import { SongRepository } from "./song.repository.js";
import { NotFoundError } from "../../shared/errors/not-found-error.js";
import type { Prisma } from '@prisma/client';
import type { SongFiltersDto, SongResponseDto, SongListResponseDto } from "./song.dto.js";
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

  async getAll(filters: SongFiltersDto): Promise<SongListResponseDto> {
    const result = await this.repository.findAll(filters);

    return {
      data: result.songs.map((song) => this.toSongResponseDto(song)),
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total: result.total,
        totalPages: Math.ceil(result.total / filters.limit),
      },
    };
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