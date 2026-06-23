import { BaseRepository } from '../../core/database/base.repository.js';

/**
 * TaskRepository class.
 * Handles database operations for the Task model by extending BaseRepository.
 */
export class TaskRepository extends BaseRepository {
  constructor() {
    super('task');
  }
}
