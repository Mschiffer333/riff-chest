import { prisma } from '../../shared/lib/prisma.js';
import type { CreateSongDto } from './song.schema.js';

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

  async findAll() {
    return prisma.song.findMany({
      include: {
        guitar: true,
        tuning: true,
        genre: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
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