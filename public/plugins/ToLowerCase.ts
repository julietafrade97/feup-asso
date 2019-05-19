import { Task, Message } from "./tasks";
import { State } from "../design-patterns/behavioral-patterns";
import { Creator } from "../design-patterns/creational-patterns";

/**
 * Creator of Task ToLowerCase
 */
class CreatorToLowerCase extends Creator{

    createTask(): Task{
        return new ToLowerCase();
    }

    public static getSingleton(): Creator{
        if (CreatorToLowerCase.singleton == null) {
            CreatorToLowerCase.singleton = new CreatorToLowerCase();
        }
     
        return CreatorToLowerCase.singleton;
    }
}

/**
 * Task to convert strings to uppercase
 */
class ToLowerCase extends Task {
    
    state: State;
    filters: Task[];

    modifyData(data: Message): Message {
        return data.value.toLowerCase();
    }
}