import type { Request, Response } from "express";
import type { CreateSongDto } from "./song.schema.js";
import { SongService } from "./song.service.js";

export class SongController {
    constructor(
        private readonly service = new SongService()
    ) {}

    async create(request: Request, response: Response) {
        const body = request.body as CreateSongDto;
        const song = await this.service.create(body);
        return response.status(201).json(song);
    }
}