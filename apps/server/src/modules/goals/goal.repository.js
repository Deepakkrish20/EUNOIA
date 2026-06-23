import { BaseRepository } from '../../core/database/base.repository.js';

/**
 * GoalRepository class.
 * Handles database operations for the Goal model by extending BaseRepository.
 */
export class GoalRepository extends BaseRepository {
  constructor() {
    super('goal');
  }
}
