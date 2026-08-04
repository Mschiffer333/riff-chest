import type { Request, Response } from "express";
import { TuningService } from "./tuning.service.js";

export class TuningController {
    constructor(
        private readonly tuningService = new TuningService(),
    ) {}

    async getAll(request: Request, response: Response) { 
        //throw new Error('Testing error middleware');
        const tunings = await this.tuningService.getAllTunings();

        return response.status(200).json(tunings);
    }
}