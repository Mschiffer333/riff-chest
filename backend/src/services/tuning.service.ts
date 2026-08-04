import { TuningRepository } from '../repositories/tuning.repository.ts'

export class TuningService {
    constructor(
        private readonly tuningRepository = new TuningRepository(),
    ) {}

    async getAllTunings() {
        return this.tuningRepository.findAll();
    }
}