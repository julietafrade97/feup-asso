import { Creator } from "../creational";
import { Task, State, Message } from "../tasks";
/**
 * Creator of Task ToLowerCase
 */
class ToLowerCaseCreator extends Creator{

    createTask(): Task{
        return new ToLowerCase();
    }

    public static getSingleton(): Creator{
        if (ToLowerCaseCreator.singleton == null) {
            ToLowerCaseCreator.singleton = new ToLowerCaseCreator();
        }
     
        return ToLowerCaseCreator.singleton;
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

export { ToLowerCase as Task, ToLowerCaseCreator as Creator }