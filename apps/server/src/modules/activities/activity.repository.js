import { BaseRepository } from '../../core/database/base.repository.js';

/**
 * ActivityRepository class.
 * Handles database operations for the Activity model by extending BaseRepository.
 */
export class ActivityRepository extends BaseRepository {
  constructor() {
    super('activity');
  }
}
