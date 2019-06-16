import { Creator } from "../creational";
import { Task, State, Message, Prototype, Node } from "../tasks";
/**
 * Creator of Task ToLowerCase
 */
class ToLowerCaseCreator extends Creator{

    createTask(): Task{
        return new ToLowerCase(null);
    }

    public static getInstance(): Creator{
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
    filters: Node[];

    constructor(prototype: ToLowerCase) {
        super(prototype);
    }

    public clone(): Prototype {
        return new ToLowerCase(this);
    }

    modifyData(data: Message): Message {
        return new Message(data.value.toLowerCase());
    }
}

export { ToLowerCase as Task, ToLowerCaseCreator as Creator }