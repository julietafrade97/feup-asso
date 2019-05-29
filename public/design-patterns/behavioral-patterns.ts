import { Task, Message } from "../plugins/tasks";

export abstract class State {
    constructor(public task: Task) {}
    /**
     * Executes the task action
     * @param data message to process
     * @returns the data sent to the next task
     */
    public abstract execute(data: Message) : Message;
}

export class Active extends State {
    public execute(data: Message): Message {
        const modified: Message = this.task.modifyData(data);
        const send: Message = new Message(modified.value, modified.from, modified.to);
        this.task.next(send);
        return modified;
    }
}

export class Idle extends State {
    public execute(data: Message): Message {
        const send: Message = new Message(data.value, data.from, data.to);
        this.task.next(send);
        return data;
    }
}
