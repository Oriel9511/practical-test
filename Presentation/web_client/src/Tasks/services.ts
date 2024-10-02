import { BaseService } from '../data/services/BaseService.ts';
import { Task } from "../../../../Core/Task.ts";

export class TasksServices extends BaseService {
    constructor() {
        super();
        this.getAll = () => super.get<Task[]>('/tasks');
        this.getById = (id: string) => super.get<Task>(`/tasks/${id}`);
        this.create = (task: Task) => super.post<Task>('/tasks', task);
        this.update = (id: string, task: Task) => super.put<Task>(`/tasks/${id}`, task);
        this.deleteTask = (id: string) => super.delete(`/tasks/${id}`).then(() => {});
    }
    getAll: () => Promise<Task[] | undefined>;
    getById: (id: string) => Promise<Task | undefined>;
    create: (task: Task) => Promise<Task | undefined>;
    update: (id: string, task: Task) => Promise<Task | undefined>;
    deleteTask: (id: string) => Promise<void>;
}
