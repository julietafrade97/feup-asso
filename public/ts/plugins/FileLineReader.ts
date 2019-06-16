import { Creator } from "../creational";
import { Task, State, Message, Prototype } from "../tasks";

/**
 * Creator of Task FileLineReader
 */
class FileLineReaderCreator extends Creator{

    createTask(): Task{
        return new FileLineReader(null);
    }

    public static getInstance(): Creator{
        if (FileLineReaderCreator.singleton == null) {
            FileLineReaderCreator.singleton = new FileLineReaderCreator();
        }

        return FileLineReaderCreator.singleton;
    }
}

/**
 * Task to read from a file, line by line
 */
export class FileLineReader  extends Task {
    filters: Task[];
    lines: string[] = [];

    constructor(prototype: FileLineReader) {
        super(prototype);
        if(prototype !== null) {
            this.lines = prototype.lines.slice(0);
        }
    }

    public clone(): Prototype {
        return new FileLineReader(this);
    }

    modifyData(data: Message): Message {
        return new Message(this.lines.shift());
    }

    execute(data: Message): Message {
        
        this.lines = data.value.split('\n');
        
        const result = this.lines;
        console.log(result);
        while(this.lines.length > 0) {
            super.execute(data);
        }

        return new Message(result);
    }
}

export { FileLineReader as Task, FileLineReaderCreator as Creator }
