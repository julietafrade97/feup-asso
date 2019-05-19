import { Task, Message } from "./tasks";
import { State } from "../design-patterns/behavioral-patterns";

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

export { ToUpperCase as Task };