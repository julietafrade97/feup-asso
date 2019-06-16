import { resolve } from "url";

export class Message {
    constructor(public value: any) { }
    static none = new Message(null)
}

export abstract class State {
    constructor(public task: Task) { }
    /**
     * Executes the task action
     * @param data message to process
     * @returns the data sent to the next task
     */
    public abstract execute(data: Message): Message;
}

class Active extends State {
    public execute(data: Message): Message {
        const modified: Message = this.task.modifyData(data);
        const send: Message = new Message(modified.value);
        this.task.next(send);
        return modified;
    }
}

class Idle extends State {
    public execute(data: Message): Message {
        const send: Message = new Message(data.value);

        this.task.next(send);
        return data;
    }
}

export class Task implements Prototype {
    state: State;
    filters: Task[] = [];
    content: Message = Message.none;
    file_input: boolean = false;
    user_input: boolean = false;
    output: boolean = false;

    constructor(prototype: Task) {
        if(prototype !== null) {
            this.content = new Message(prototype.content.value);
            prototype.filters.forEach( filter => this.filters.push(<Task>filter.clone()));
        }
        this.state = new Active(this);
    }

    public clone(): Prototype {
        return new Task(this);
    }

    changeState(): void {
        if (this.state instanceof Active) {
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

    next(data: Message) {
        this.filters.forEach(filter => {
            filter.execute(data);
        });

        console.log("fim da recipe. Data = " + data.value);
        console.log(this);
    }
    /**
     * Method directly called for each task
     * @param data message to pass through the chain of tasks
     * @returns The message that was passed to the next task
     */
    execute(data: Message) {
        return this.state.execute(data);
    }
}

/**
 * Works as the design pattern Adapter 
 */
export class Node {
    public task: Task;
    public id: number;
    public label: string;
    public pause: boolean;
    public debugMode: boolean;
    public changeOutputMode: boolean;

    constructor(id: number, task: Task, label: string) {
        this.task = task;
        this.id = id;
        this.label = label;
    }

    public getOptions() {
        let options: string[] = [];
        if (this.pause) {
            options.push("Reactivate");
        } else {
            options.push("Pause");
        }

        if (this.debugMode) {
            options.push("Stop debugging");
        } else {
            options.push("Debug");
        }

        if (this.changeOutputMode) {
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
        if (this.changeOutputMode) {
            if (this.task instanceof ChangeOutputDecorator) { // ChangeOutputDecorator wrapping another task
                (<ChangeOutputDecorator>this.task).setNewData(newData);
            } else { // DebugDecorator wrapping ChangeOutputDecorator
                (<ChangeOutputDecorator>(<DebugDecorator>this.task).wrappee).setNewData(newData);
            }
        } else {
            let newTask = new ChangeOutputDecorator(null);
            newTask.setWrappee(this.task);
            this.task = newTask;

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

export class Recipe implements Prototype {
    public name: string = "";
    public nodes: Node[] = [];
    public edges: Array<{ from: number, to: number }> = [];

    constructor(prototype: Recipe) { 
        if(prototype !== null) {
            this.name = prototype.name;
            prototype.nodes.forEach( node => {
                const copy = new Node(node.id, <Task>node.task.clone(), node.label);
                this.nodes.push(copy);
            });
            this.edges = prototype.edges.slice(0);
        }
    }

    public clone(): Prototype {
        return new Recipe(this);
    }

    public addNode(id: number, task: Task, label: string) {
        const node: Node = new Node(id, task, label);
        this.nodes.push(node);

        return node;
    }

    public connectNodes(src: number, dest: number): void {
        const srcNode: Node = this.nodes.find(node => node.id === src);
        const destNode: Node = this.nodes.find(node => node.id === dest);
        if(destNode.task.user_input || destNode.task.file_input) { // no task can connect to a read task
            return;
        }

        srcNode.connectTask(destNode.task);

        this.edges.push({ from: src, to: dest });
    }

    public getNode(id: number): Node {
        return this.nodes.find(node => node.id === id);
    }

    //[TODO]: se calhar podiamos usar strategy aqui para o run poder ter dois comportamentos diferentes:
    // ou começava com a mensagem a nulo (Message.none)
    // ou pediamos input ao utilizador e punhamos na mensagem (new Message(value, from, to))
    public run(fileInput: string, userInput: string): string {
        let result: string = "";

        let startingNodes: Node[] = this.nodes.filter(node => node.task.file_input);
        startingNodes.forEach(node => node.task.execute(new Message(fileInput)));

        startingNodes = this.nodes.filter(node => node.task.user_input);
        startingNodes.forEach(node => node.task.execute(new Message(userInput)));
        
        this.nodes.filter(node => node.task.output).forEach(node => {
            result += node.task.content.value + '\n';
            node.task.content.value = "";
        });
        return result;
    }
}

export interface Prototype {
    clone(): Prototype;
}

export class TaskDecorator extends Task {
    state: State;
    filters: Task[];
    public wrappee: Task = null;
    content: Message = Message.none;

    constructor(prototype: TaskDecorator) {
        super(prototype);
        if(prototype !== null) {
            this.wrappee = <Task>prototype.wrappee.clone();
        }
    }

    public clone(): Prototype {
        return new TaskDecorator(this);
    }

    setWrappee(wrappee: Task) {
        this.wrappee = wrappee;
    }

    addFilter(filter: Task): void {
        this.wrappee.addFilter(filter);
    }

    execute(data: Message): Message {
        return this.wrappee.execute(data);
    }
}

export class DebugDecorator extends TaskDecorator {
    execute(data: Message): Message {
        const receivedMsg: Message = super.execute(data);
        // [TODO] show task current state/info
        this.content = new Message(this.currentState(receivedMsg.value));
        return this.content;
    }

    /**
     * Info we want to return for the debug mode
     */
    currentState(data: string): string {
        // [TODO]: tentar arranjar mais informacao para mostrar
        return "The message sent to the next task was " + data;
    }
}

export class ChangeOutputDecorator extends TaskDecorator {
    newData: string;

    setNewData(data: string) {
        this.newData = data;
    }

    execute(data: Message): Message {
        // change data
        data.value = this.newData;
        this.content = super.execute(data);
        return this.content;
    }
}


