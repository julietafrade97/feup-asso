import { Task, Message } from "./tasks";
import { State } from "../design-patterns/behavioral-patterns";
import { Creator } from "../design-patterns/creational-patterns";

/**
 * Creator of Task ToUpperCase
 */
class ToUpperCaseCreator extends Creator{

    createTask(): Task{
        return new ToUpperCase();
    }

    public static getSingleton(): Creator{
        if (ToUpperCaseCreator.singleton == null) {
            ToUpperCaseCreator.singleton = new ToUpperCaseCreator();
        }
     
        return ToUpperCaseCreator.singleton;
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

export { ToUpperCase as Task, ToUpperCaseCreator as Creator };