import { Creator } from "../creational";
import { Task, State, Message } from "../tasks";
/**
 * Creator of Task ToUpperCase
 */
class ToUpperCaseCreator extends Creator{

    createTask(): Task{
        return new ToUpperCase();
    }

    public static getInstance(): Creator{
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