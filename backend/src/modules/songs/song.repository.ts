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
}