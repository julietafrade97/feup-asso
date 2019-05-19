import { Task, Message } from "./tasks";
import { State } from "../design-patterns/behavioral-patterns";
import { Creator } from "../design-patterns/creational-patterns";

const fs = require('fs');

/**
 * Creator of Task Writer
 */
class CreatorWriter extends Creator{

    createTask(): Task{
        return new Writer();
    }

    public static getSingleton(): Creator{
        if (CreatorWriter.singleton == null) {
            CreatorWriter.singleton = new CreatorWriter();
        }
     
        return CreatorWriter.singleton;
    }
}

/**
 * Task to write in a file
 */
class Writer extends Task {
    state: State;
    filters: Task[];

    modifyData(data: Message): Message {
        fs.appendFile(data.to, data.value, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });

        return data;
    }

   
}

export { Writer as Task };