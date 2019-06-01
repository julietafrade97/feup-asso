import { readFileSync } from "fs";
import { Creator } from "../creational";
import { Task, State, Message } from "../tasks";

/**
 * Creator of Task FileLineReader
 */
class FileLineReaderCreator extends Creator{

    createTask(): Task{
        return new FileLineReader();
    }

    public static getSingleton(): Creator{
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
    state: State;
    filters: Task[];
    lines: string[];

    modifyData(data: Message): Message {
        return new Message(this.lines.shift(), data.from, data.to);
    }

    execute(data: Message): Message {
        this.lines = readFileSync(data.from, 'utf-8').split('\n');
        const result = this.lines;
        while(this.lines.length > 0) {
            super.execute(data);
        }

        return new Message(result, "", "");
    }
}

export { FileLineReader as Task, FileLineReaderCreator as Creator }
