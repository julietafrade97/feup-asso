import { State, Active, Idle } from "../design-patterns/behavioral-patterns";

export class Message {
    constructor(public value: any, public from: string, public to: string) { }
    static none = new Message(null, "", "")
}

export class Task {
    state: State;
    filters: Task[];

    constructor() {
        this.state = new Active(this);
    }

    changeState(): void {
        if(this.state instanceof Active) {
            this.state = new Idle(this);
        } else {
            this.state = new Active(this);
        }
    }

    addFilter(filter: Task): void {
        this.filters.push(filter);
    }
    
    modifyData(data: Message): Message {
        return Message.none;
    }
    next(data: Message): void {
        this.filters.forEach(filter => {
            filter.execute(data)
        });
    }
    execute(data: Message): void {
        this.state.execute(data);
    }
}