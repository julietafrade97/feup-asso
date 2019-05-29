import { State, Active, Idle } from "../design-patterns/behavioral-patterns";
import { ChangeOutputDecorator, DebugDecorator } from "../design-patterns/structural-patterns";

export class Message {
    constructor(public value: any, public from: string, public to: string) { }
    static none = new Message(null, "", "")
}

export class Task {
    state: State;
    filters: Task[];
    content: Message;

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
    /**
     * Method directly called for each task
     * @param data message to pass through the chain of tasks
     * @returns The message that was passed to the next task
     */
    execute(data: Message): Message {
        this.content = this.state.execute(data);
        return this.content;
    }
}

/**
 * Works as the design pattern Adapter 
 */
export class Node {
    public task: Task;
    public id: number;
    public pause: boolean;
    public debugMode: boolean;
    public changeOutputMode: boolean;

    constructor(id: number, task: Task) {
        this.task = task;
        this.id = id;
    }

    public getOptions() {
        let options: string[] = [];
        if(this.pause) {
            options.push("Reactivate");
        } else {
            options.push("Pause");
        }

        if(this.debugMode) {
            options.push("Stop debugging");
        } else {
            options.push("Debug");
        }

        if(this.changeOutputMode) {
            options.push("New value");
            options.push("Remove changes on the output");
        }
        options.push("New value");
    }

    public changeState() {
        this.task.changeState();
    }

    public connectTask(nextTask: Task) {
        this.task.addFilter(nextTask);
    }

    public getContent(): string {
        return this.task.content.value;
    }

    public changeOutput(newData: string) {
        if(this.changeOutputMode) { 
            if(this.task instanceof ChangeOutputDecorator) { // ChangeOutputDecorator wrapping another task
                (<ChangeOutputDecorator>this.task).setNewData(newData);
            } else { // DebugDecorator wrapping ChangeOutputDecorator
                (<ChangeOutputDecorator>(<DebugDecorator>this.task).wrappee).setNewData(newData);
            }
        } else {
            this.task = new ChangeOutputDecorator(this.task);
            (<ChangeOutputDecorator>this.task).setNewData(newData);
            this.changeOutputMode = true;
        }
    }

    public disableChangeOutput() {
        if (this.task instanceof ChangeOutputDecorator) { // ChangeOutputDecorator wrapping another task
            this.task = (<ChangeOutputDecorator>this.task).wrappee;
        } else { // DebugDecorator wrapping ChangeOutputDecorator
            const t: Task = (<ChangeOutputDecorator>(<DebugDecorator>this.task).wrappee).wrappee; //the main  task
            (<DebugDecorator>this.task).wrappee = t;
        }

        this.changeOutputMode = false;
    }

    public disableDebug() {
        if (this.task instanceof DebugDecorator) { // DebugDecorator wrapping another task
            this.task = (<DebugDecorator>this.task).wrappee;
        } else { // ChangeOutputDecorator wrapping DebugDecorator
            const t: Task = (<DebugDecorator>(<ChangeOutputDecorator>this.task).wrappee).wrappee; //the main  task
            (<ChangeOutputDecorator>this.task).wrappee = t;
        }

        this.debugMode = false;
    }


}

export class Recipe {
    public name: string;
    public nodes: Node[] = [];
    public edges: number[][] = [];
    public startingNode: Node = null;

    constructor() {}

    public setStartingNode(node: Node) {
        this.startingNode = node;
    }

    public addNode(id: number, task: Task) {
        const node: Node = new Node(id, task);
        this.nodes.push(node);
    }

    public connectNodes(src: number, dest: number) {
        const srcNode: Node = this.nodes.find(node => node.id === src);
        const destNode: Node = this.nodes.find(node => node.id === dest);
        srcNode.connectTask(destNode.task);

        this.edges.push([src, dest]);
    }

    //[TODO]: se calhar podiamos usar strategy aqui para o run poder ter dois comportamentos diferentes:
    // ou começava com a mensagem a nulo (Message.none)
    // ou pediamos input ao utilizador e punhamos na mensagem (new Message(value, from, to))
    public run() {
        this.startingNode.task.execute(Message.none);
    }
}