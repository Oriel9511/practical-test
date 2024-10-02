import {Task} from "./Task";

export class User {

    constructor(user: Partial<User> & { taskIds: string[] }) {
        this.id = user.id ?? crypto.randomUUID();
        this.email = user.email ?? "";
        this.password = user.password ?? "";
        this.taskIds = user.taskIds ?? [];
        this.tasks = user.tasks ?? [];
    }

    id: string;
    email: string;
    password: string;
    taskIds: string[];
    tasks: Task[];

    get isValidData(): boolean {
        return this.email.length > 0 && this.password.length > 0;
    }
}
