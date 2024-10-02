import {convertFromUTCToLocal, convertToUTC} from "../Services/shared/dateUtils";

export class Task {

    constructor(task: Partial<Task>) {
        this.id = task.id ?? crypto.randomUUID();
        this.title = task.title ?? "";
        this.description = task.description ?? "";
        this.creationDate = task.creationDate ?? convertToUTC(new Date());
        this.finishedDate = task.finishedDate ?? null;
        this.finished = task.finished ?? false;
        this.userId = task.userId ?? null;
    }

    id: string;
    title:string;
    description: string;
    creationDate: string;
    finishedDate: string | null;
    finished: boolean;
    userId: string | null;

    get localCreationDate(): string {
        return convertFromUTCToLocal(this.creationDate);
    }

    get localFinishedDate(): string | null {
        return this.finishedDate ? convertFromUTCToLocal(this.finishedDate) : null;
    }
}
