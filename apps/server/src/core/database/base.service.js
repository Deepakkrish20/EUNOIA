/**
 * BaseService class.
 * Intermediary logical layer connecting controllers and repository clients.
 */
export class BaseService {
  /**
   * @param {import('./base.repository').BaseRepository} repository 
   */
  constructor(repository) {
    this.repository = repository;
  }

  async getAll(queryOptions = {}) {
    return this.repository.findMany(queryOptions);
  }

  async getById(id) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      const error = new Error(`Entity with ID "${id}" was not found.`);
      error.status = 404;
      throw error;
    }
    return entity;
  }

  async create(data) {
    return this.repository.create({ data });
  }

  async update(id, data) {
    // Ensure entity exists before attempting update
    await this.getById(id);
    return this.repository.update(id, data);
  }

  async delete(id) {
    // Ensure entity exists before attempting deletion
    await this.getById(id);
    return this.repository.delete(id);
  }
}
