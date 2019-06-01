import { Creator } from "../creational";
import { Task, State, Message } from "../tasks";
import { readFileSync } from "fs";	

const fs = require('fs');
/**
 * Creator of Task Reader 
 */
class ReaderCreator extends Creator{

    createTask(): Task{
        return new Reader();
    }

    public static getSingleton(): Creator{
        if (ReaderCreator.singleton == null) {
            ReaderCreator.singleton = new ReaderCreator();
        }
     
        return ReaderCreator.singleton;
    }
}

/**
 * Task to read from a file, line by line
 */
export class Reader extends Task {
    state: State;
    filters: Task[];
    text: string;

    modifyData(data: Message): Message {
        return new Message(this.text, data.from, data.to);
    }

    execute(data: Message): Message {
        this.text = readFileSync(data.from, 'utf-8');
        const msg: Message = new Message(this.text, "", "");
        super.execute(msg);
        return msg;
    }
}

export { Reader as Task, ReaderCreator as Creator }