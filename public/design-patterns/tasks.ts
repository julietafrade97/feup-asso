import { State, Active, Idle } from "./behavioral-patterns";

const fs = require('fs');

export class Message {
    constructor(public value: any) { }
    static none = new Message(null)
}

export class Task {
    state: State;
    filters: Task[];

    constructor() {
        this.state = new Active(this);
    }

    changeState(): void {
        if(this.state instanceof Active) {
            this.state = new Idle(this);
        }
    }

    addFilter(filter: Task): void {
        this.filters.push(filter);
    }
    modifyData(data: Message): Message {
        return Message.none;
    }
    next(data: Message): void {
        this.filters.forEach(filter => {
            filter.execute(data)
        });
    }
    execute(data: Message): void {
        this.state.execute(data);
    }
}

/**
 * Task to convert strings to uppercase
 */
class ToUpperCase extends Task {
    
    state: State;
    filters: Task[];

    modifyData(data: Message): Message {
        return data.value.toUpperCase();
    }
}

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

/**
 * Task to read from a file, line by line
 */
class FileLineReader  extends Task {
    state: State;
    filters: Task[];
    lines: string[];

    modifyData(data: Message): Message {
        return new Message(this.lines.shift());
    }

    execute(data: Message): void {
        while(this.lines.length > 0) {
            super.execute(data);
        }
    }
}