import { Task, Message } from "./tasks";
import { State } from "../design-patterns/behavioral-patterns";
import { Creator } from "../design-patterns/creational-patterns";
import { readFileSync } from "fs";	

const fs = require('fs');
/**
 * Creator of Task Reader 
 */
class CreatorReader extends Creator{

    createTask(): Task{
        return new Reader();
    }

    public static getSingleton(): Creator{
        if (CreatorReader.singleton == null) {
            CreatorReader.singleton = new CreatorReader();
        }
     
        return CreatorReader.singleton;
    }
}

/**
 * Task to read from a file, line by line
 */
class Reader extends Task {
    state: State;
    filters: Task[];
    text: string;

    modifyData(data: Message): Message {
        return new Message(this.text, data.from, data.to);
    }

    execute(data: Message): void {
        this.text = readFileSync(data.from, 'utf-8')
        super.execute(data);
    }
}