import { Creator } from "../creational";
import { Task, State, Message, Prototype } from "../tasks";
const fs = require('fs');

/**
 * Creator of Task Writer
 */
class WriterCreator extends Creator{

    createTask(): Task{
        return new Writer();
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
    filters: Task[];

    constructor(prototype: Writer) {
        super(prototype);
    }

    public clone(): Prototype {
        return new Writer(this);
    }

    modifyData(data: Message): Message {
        fs.appendFile("../../../write-file.txt", data.value, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });

        return data;
    }

   
}

export { Writer as Task, WriterCreator as Creator };