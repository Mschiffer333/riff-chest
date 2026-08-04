import { prisma } from '../lib/prisma.js';

export class TuningRepository {
    async findAll() {
        return prisma.tuning.findMany({
            orderBy: {
                name: 'asc'
            }
        })
    }
}