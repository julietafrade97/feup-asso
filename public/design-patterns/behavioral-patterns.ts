import { Task, Message } from "./tasks";

export abstract class State {
    constructor(public task: Task) {}
    public abstract execute(data: Message) : void;
}

export class Active extends State {
    public execute(data: Message): void {
        this.task.execute(data);
    }

}

export class Idle extends State {
    public execute(data: Message): void {
        this.task.filters.forEach(filter => {
            filter.execute(data)
        });
    }
}
