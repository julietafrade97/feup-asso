import { Creator } from "../creational";
import { Task, State, Message, Prototype } from "../tasks";
import { readFileSync } from "fs";	

const fs = require('fs');
/**
 * Creator of Task Reader 
 */
class ReaderCreator extends Creator{

    createTask(): Task{
        return new InputReader(null);
    }

    public static getInstance(): Creator{
        if (ReaderCreator.singleton == null) {
            ReaderCreator.singleton = new ReaderCreator();
        }
     
        return ReaderCreator.singleton;
    }
}

/**
 * Task to read from a file, line by line
 */
export class InputReader extends Task {
    state: State;
    filters: Task[];
    text: string;

    constructor(prototype: InputReader) {
        super(prototype);
        if(prototype !== null) {
            this.text = prototype.text;
        }
        super.user_input = true;
    }

    public clone(): Prototype {
        return new InputReader(this);
    }

    modifyData(data: Message): Message {
        return new Message(this.text);
    }

    execute(data: Message): Message {
        this.text = data.value;
        const msg: Message = new Message(this.text);
        super.execute(msg);
        return msg;
    }
}

export { InputReader as Task, ReaderCreator as Creator }