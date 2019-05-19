import { Task, Message } from "./tasks";
import { State } from "../design-patterns/behavioral-patterns";

const fs = require('fs');

/**
 * Task to write in a file
 */
class Writer  extends Task {
    state: State;
    filters: Task[];
    filename: string;

    modifyData(data: Message): Message {
        fs.appendFile(this.filename, data.value, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });

          return data;
    }

   
}