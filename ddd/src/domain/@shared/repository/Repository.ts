export interface Repository<T> {
    create(entity: T): Promise<void>
    findById(id: string): Promise<T | undefined>
    findAll(): Promise<T[]>
    update(entity: T): Promise<void>
}
