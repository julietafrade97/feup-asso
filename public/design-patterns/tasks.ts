import { State } from "./behavioral-patterns";
import { readFileSync } from "fs";

const fs = require('fs');

export class Message {
    constructor(public value: any) { }
    static none = new Message(null)
}

export interface Task {
    state: State;
    filters: Task[];
    addFilter(filter: Task): void;
    execute(data: Message): void;
}

/**
 * Task to convert strings to uppercase
 */
class ToUpperCase implements Task {
    
    state: State;
    filters: Task[];

    constructor() {}

    addFilter(filter: Task): void {
        this.filters.push(filter);
    }

    execute(data: Message): void {
        this.filters.forEach(filter => {
            filter.execute(data.value.toUpperCase())
        });
    }
}

/**
 * Task to write in a file
 */
class Writer  implements Task {
    state: State;
    filters: Task[];
    filename: string;

    constructor() {}

    addFilter(filter: Task): void {
        this.filters.push(filter);
    }

    execute(data: Message): void {
        fs.appendFile(this.filename, data.value, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
    }

   
}

/**
 * Task to read from a file, line by line
 */
class FileLineReader  implements Task {
    state: State;
    filters: Task[];
    lines: string[];

    constructor(public readonly fileName: string) {
        this.lines = readFileSync(fileName, 'utf-8').split('\n')
    }
    
    addFilter(filter: Task): void {
        this.filters.push(filter);
    }

    execute(data: Message): void {
        while(this.lines.length > 0) {
            this.filters.forEach(filter => {
                filter.execute(new Message(this.lines.shift()))
            });
        }
    }
}