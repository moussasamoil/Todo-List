import { Model, QueryFilter } from "mongoose";


export abstract class BaseRepo<T> {
    constructor(protected readonly model: Model<T>) { }

    async createDocument(data: Partial<T>): Promise<T> {
        let result = await this.model.create(data);
        return result;
    }

    getAllDocument(): Promise<T[]> {
        return this.model.find().select('-password').exec();
    }

    findOne(filter: QueryFilter<T>) {
      return this.model.findOne(filter).exec()
    }
}