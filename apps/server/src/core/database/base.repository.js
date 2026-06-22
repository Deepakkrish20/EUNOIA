import { prisma } from './index.js';

/**
 * BaseRepository class.
 * Wraps Prisma model CRUD methods dynamically.
 */
export class BaseRepository {
  /**
   * @param {string} modelName - Name of the target Prisma model (camelCase/PascalCase matching schema)
   */
  constructor(modelName) {
    this.db = prisma;
    this.model = prisma[modelName];
    if (!this.model) {
      throw new Error(`[BaseRepository Error]: Model "${modelName}" not found on Prisma Client.`);
    }
  }

  async findMany(queryOptions = {}) {
    return this.model.findMany(queryOptions);
  }

  async findUnique(queryOptions) {
    return this.model.findUnique(queryOptions);
  }

  async findById(id) {
    return this.model.findUnique({
      where: { id },
    });
  }

  async create(payload) {
    return this.model.create(payload);
  }

  async update(id, data, extraOptions = {}) {
    return this.model.update({
      where: { id },
      data,
      ...extraOptions,
    });
  }

  async delete(id) {
    return this.model.delete({
      where: { id },
    });
  }

  async count(queryOptions = {}) {
    return this.model.count(queryOptions);
  }
}
