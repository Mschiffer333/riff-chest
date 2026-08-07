import type { Request, Response } from "express";
import type { CreateSongDto } from "./song.schema.js";
import { SongService } from "./song.service.js";
import { filterSongsSchema } from "./song.schema.js";

export class SongController {
    constructor(
        private readonly service = new SongService()
    ) {}

    async create(request: Request, response: Response) {
        const body = request.body as CreateSongDto;
        const song = await this.service.create(body);
        return response.status(201).json(song);
    }

    async getAll(request: Request, response: Response) {
        const filters = filterSongsSchema.parse(request.query);
        const songs = await this.service.getAll(filters);

        return response.status(200).json(songs);
    }

    async getById(request: Request, response: Response) {
        const { id } = request.params;
        const song = await this.service.getById(id);

        return response.status(200).json(song);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const body = request.body as CreateSongDto;
        const song = await this.service.update(id, body);

        return response.status(200).json(song);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        await this.service.delete(id);

        return response.sendStatus(204);
    }
}