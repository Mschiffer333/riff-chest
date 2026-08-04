import { TuningRepository } from './tuning.repository.js'
import type { TuningResponseDto } from './tuning.dto.js';

export class TuningService {
    constructor(
        private readonly tuningRepository = new TuningRepository(),
    ) {}

    async getAllTunings(): Promise<TuningResponseDto[]> {
    const tunings = await this.tuningRepository.findAll();

    return tunings.map((tuning) => ({
      id: tuning.id,
      name: tuning.name,
      numberStrings: tuning.numberStrings,
      notes: tuning.notes,
    }));
  }
}