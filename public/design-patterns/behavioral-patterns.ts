import { Task, Message } from "../plugins/tasks";

export abstract class State {
    constructor(public task: Task) {}
    public abstract execute(data: Message) : void;
}

export class Active extends State {
    public execute(data: Message): void {
        this.task.next(this.task.modifyData(data))
    }
}

export class Idle extends State {
    public execute(data: Message): void {
        this.task.next(data);
    }
}
