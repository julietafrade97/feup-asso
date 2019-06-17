import { Creator } from "../creational";
import { Task, State, Message, Prototype, Node } from "../tasks";
const fs = require('fs');

/**
 * Creator of Task Writer
 */
class WriterCreator extends Creator{

    createTask(): Task{
        return new Writer(null);
    }

    public static getInstance(): Creator{
        if (WriterCreator.singleton == null) {
            WriterCreator.singleton = new WriterCreator();
        }
     
        return WriterCreator.singleton;
    }
}

/**
 * Task to write in a file
 */
class Writer extends Task {
    state: State;
    filters: Node[];

    constructor(prototype: Writer) {
        super(prototype);
        super.output = true;
    }

    public clone(): Prototype {
        return new Writer(this);
    }

    modifyData(data: Message): Message {
        if(this.content.value === null) {
            this.content.value = "";
        }
        const value: string = this.content.value + data.value + " ";
        this.content = new Message(value);
        return new Message(value);
    }

   
}

export { Writer as Task, WriterCreator as Creator };