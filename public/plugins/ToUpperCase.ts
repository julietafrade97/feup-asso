import { Task, Message } from "./tasks";
import { State } from "../design-patterns/behavioral-patterns";
import { Creator } from "../design-patterns/creational-patterns";

/**
 * Creator of Task ToUpperCase
 */
class CreatorToUpperCase extends Creator{

    createTask(): Task{
        return new ToUpperCase();
    }

    public static getSingleton(): Creator{
        if (CreatorToUpperCase.singleton == null) {
            CreatorToUpperCase.singleton = new CreatorToUpperCase();
        }
     
        return CreatorToUpperCase.singleton;
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

export { ToUpperCase as Task };