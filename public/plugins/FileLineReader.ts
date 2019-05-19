import { Task, Message } from "./tasks";
import { State } from "../design-patterns/behavioral-patterns";
import { Creator } from "../design-patterns/creational-patterns";
import { readFileSync } from "fs";	

const fs = require('fs');

/**
 * Creator of Task FileLineReader 
 */
class CreatorFileLineReader extends Creator{

    createTask(): Task{
        return new FileLineReader();
    }

    public static getSingleton(): Creator{
        if (CreatorFileLineReader.singleton == null) {
            CreatorFileLineReader.singleton = new CreatorFileLineReader();
        }
     
        return CreatorFileLineReader.singleton;
    }
}

/**
 * Task to read from a file, line by line
 */
class FileLineReader extends Task {
    state: State;
    filters: Task[];
    lines: string[];

    modifyData(data: Message): Message {
        return new Message(this.lines.shift(), data.from, data.to);
    }

    execute(data: Message): void {
        this.lines = readFileSync(data.from, 'utf-8').split('\n');
        while(this.lines.length > 0) {
            super.execute(data);
        }
    }
}