import type { Request, Response } from "express";
import { TuningService } from "../services/tuning.service.ts";

export class TuningController {
    constructor(
        private readonly tuningService = new TuningService(),
    ) {}

    async getAll(request: Request, response: Response) { 
        const tunings = await this.tuningService.getAllTunings();

        return response.status(200).json(tunings);
    }
}