import { Task, Message } from "./tasks";
import { State } from "./behavioral-patterns";

export class TaskDecorator extends Task {
    state: State;
    filters: Task[];

    constructor(public wrappee: Task) {
        super();
     }

    addFilter(filter: Task): void {
        this.wrappee.addFilter(filter);
    }

    execute(data: Message): void {
        this.wrappee.execute(data);
    }
}

export class DebugDecorator extends TaskDecorator {
    execute(data: Message): void {
        super.execute(data);
        // [TODO] show task current state/info
    }
}

export class ChangeOutputDecorator extends TaskDecorator {
    newData: string;

    setNewData(data: string) {
        this.newData = data;
    }
    
    execute(data: Message): void {
        // change data
        data.value = this.newData;
        super.execute(data);
    }
}
