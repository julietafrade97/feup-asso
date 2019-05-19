import { Task, Message } from "./tasks";
import { State } from "../design-patterns/behavioral-patterns";

/**
 * Task to read from a file, line by line
 */
export class FileLineReader  extends Task {
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

export { FileLineReader as Task/*, FileLineReadorCreator as Creator*/ }