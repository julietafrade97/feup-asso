import { Creator } from "../creational";
import { Task, State, Message, Prototype, Node } from "../tasks";

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
    filters: Node[];
    lines: string[] = [];

    constructor(prototype: FileLineReader) {
        super(prototype);
        if(prototype !== null) {
            this.lines = prototype.lines.slice(0);
        }
        super.file_input = true;
    }

    public clone(): Prototype {
        return new FileLineReader(this);
    }

    modifyData(data: Message): Message {
        return new Message(this.lines.shift());
    }

    passData(data: Message): Message {
        this.lines = [];
        return new Message('');
    }

    execute(data: Message): Message {
        
        this.lines = data.value.split('\n');
        let result: string = "";
        while(this.lines.length > 0) {
            result += super.execute(data).value + " ";
        }
        result.trim();
        return new Message(result);
    }
}

export { FileLineReader as Task, FileLineReaderCreator as Creator }
