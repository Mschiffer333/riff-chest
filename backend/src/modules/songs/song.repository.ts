import { prisma } from '../../shared/lib/prisma.js';
import type { CreateSongDto } from './song.schema.js';
import type { Prisma } from '@prisma/client';
import type { SongFiltersDto } from './song.dto.js';

export class SongRepository {
  async create(data: CreateSongDto & { mastered: boolean }) {
    return prisma.song.create({
      data,
      include: {
        guitar: true,
        tuning: true,
        genre: true,
      },
    });
  }

  async findAll(filters: SongFiltersDto) {
    const where: Prisma.SongWhereInput = {}
    const skip = (filters.page - 1) * filters.limit;
    if(filters.artist) {
      where.artist = {
        contains: filters.artist,
        mode: 'insensitive'
      };
    }
    if(filters.title) {
      where.title = {
        contains: filters.title,
        mode: 'insensitive'
      }
    }

    const total = await prisma.song.count({
      where,
    });

    const orderBy = {
      [filters.sort]: filters.order
    }

    const songs =await prisma.song.findMany({
      where,
      skip,
      take: filters.limit,
      include: {
        guitar: true,
        tuning: true,
        genre: true
      },
      orderBy
    });

    return {
      songs,
      total
    }
  }

  async findById(id: string) {
    return prisma.song.findUnique({
      where: {
        id,
      },
      include: {
        guitar: true,
        tuning: true,
        genre: true,
      },
    });
  }

  async update(
    id: string,
    data: CreateSongDto & { mastered: boolean },
  ) {
    return prisma.song.update({
      where: {
        id,
      },
      data,
      include: {
        guitar: true,
        tuning: true,
        genre: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.song.delete({
      where: {
        id,
      },
    });
  }
}