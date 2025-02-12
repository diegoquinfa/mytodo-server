import { ValidationError } from '@/shared/application/errors/ValidationError'
import { DatabaseError } from '@/shared/application/errors/DatabaseError'
import { TaskSchema } from '../domain/Task'
import { ITasksRepository } from '../domain/ITasksRepository'

export class TaskCreate {
  private readonly tasksRepository: ITasksRepository

  constructor(tasksRepository: ITasksRepository) {
    this.tasksRepository = tasksRepository
  }

  public async run(taskData: unknown): Promise<void> {
    const task = TaskSchema.safeParse(taskData)

    if (!task.success) {
      throw new ValidationError(task.error.flatten())
    }

    try {
      await this.tasksRepository.save(task.data)
    } catch (err) {
      if (err instanceof Error) {
        throw new DatabaseError(err)
      }
    }
  }
}
