import { Creator } from "../creational";
import { Task, State, Message, Prototype, Node } from "../tasks";
/**
 * Creator of Task ToUpperCase
 */
class ToUpperCaseCreator extends Creator{

    createTask(): Task{
        return new ToUpperCase(null);
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
    filters: Node[];

    constructor(prototype: ToUpperCase) {
        super(prototype);
    }

    public clone(): Prototype {
        return new ToUpperCase(this);
    }

    modifyData(data: Message): Message {
        return new Message(data.value.toUpperCase());
    }
}

export { ToUpperCase as Task, ToUpperCaseCreator as Creator };