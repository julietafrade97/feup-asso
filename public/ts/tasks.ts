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
    filters: Node[] = [];
    content: Message = Message.none;
    file_input: boolean = false;
    user_input: boolean = false;
    output: boolean = false;
    trace: string = 'Nothing to show.';

    constructor(prototype: Task) {
        if(prototype !== null) {
            this.content = new Message(prototype.content.value);
            prototype.filters.forEach( filter => this.filters.push(new Node(filter.id, <Task>filter.task.clone(), filter.label)));
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

    addFilter(filter: Node): void {
        this.filters.push(filter);
    }

    modifyData(data: Message): Message {
        return Message.none;
    }

    next(data: Message) {
        this.filters.forEach(filter => {
            filter.task.execute(data);
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
    public isActive: number = 1;
    public pause: boolean;
    public debugMode: boolean = false;
    public changeOutputMode: boolean = false;

    constructor(id: number, task: Task, label: string) {
        this.task = task;
        this.id = id;
        this.label = label;
    }

    public changeState() {
        this.task.changeState();
        this.isActive = this.isActive === 1 ? 0 : 1;
    }

    public connectTask(nextNode: Node) {
        this.task.addFilter(nextNode);
    }

    public getContent(): string {
        return this.task.content.value;
    }

    public changeOutput(newData: string) {
        console.log("no change output");
        if (this.changeOutputMode) {
            if(this.debugMode) { // DebugDecorator wrapping ChangeOutputDecorator
                (<ChangeOutputDecorator>(<DebugDecorator>this.task).wrappee).setNewData(newData);
            } else { // ChangeOutputDecorator wrapping another task
                (<ChangeOutputDecorator>this.task).setNewData(newData);
            }
        } else {
            if(this.debugMode) {
                const mainTask = (<TaskDecorator>this.task).wrappee;
                let newTask = new ChangeOutputDecorator(null);
                newTask.setWrappee(mainTask);
                newTask.setNewData(newData);
                (<TaskDecorator>this.task).setWrappee(newTask);
            } else {
                let newTask = new ChangeOutputDecorator(null);
                newTask.setWrappee(this.task);
                newTask.setNewData(newData);
                this.task = newTask;
            }
            
            this.changeOutputMode = true;
        }
        console.log(this.task);
    }

    public enableDebug() {
        let newTask = new DebugDecorator(null);
        newTask.setWrappee(this.task);
        this.task = newTask;

        this.debugMode = true;
    }

    public disableChangeOutput() {
        if(this.changeOutputMode) {
            if(this.debugMode) { // DebugDecorator wrapping ChangeOutputDecorator
                const t: Task = (<ChangeOutputDecorator>(<DebugDecorator>this.task).wrappee).wrappee; //the main  task
                (<DebugDecorator>this.task).wrappee = t;
            } else { // ChangeOutputDecorator wrapping another task
                this.task = (<ChangeOutputDecorator>this.task).wrappee;
            }
        }

        this.changeOutputMode = false;
    }

    public disableDebug() {
        if (!(this.task instanceof TaskDecorator)) return;
        if(this.debugMode) {
            this.task = (<DebugDecorator>this.task).wrappee;
        }

        this.debugMode = false;
    }

    public getTraceLog(): string {
        return this.task.trace;
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

    public addMissingEdges(id: number) {
        const leftEdges = this.edges.filter(edge => edge.to === id);
        const rightEdges = this.edges.filter(edge => edge.from === id);

        leftEdges.forEach(leftEdge => rightEdges.forEach(rightEdge => {
            this.connectNodes(leftEdge.from, rightEdge.to);
        }));
    }

    public deleteEdgesConnectedTo(id: number) {
        this.edges = this.edges.filter(edge => edge.from !== id && edge.to !== id);
    }

    public deleteEdge(from: number, to: number) {
        this.edges = this.edges.filter(edge => edge.from !== from && edge.to !== to);
    }

    public deleteNode(id: number) {
        this.nodes.splice(this.nodes.findIndex(node => node.id === id), 1);
    }

    public connectNodes(src: number, dest: number): void {
        const srcNode: Node = this.nodes.find(node => node.id === src);
        const destNode: Node = this.nodes.find(node => node.id === dest);
        if(destNode.task.user_input || destNode.task.file_input) { // no task can connect to a read task
            return;
        }

        srcNode.connectTask(destNode);

        this.edges.push({ from: src, to: dest });
    }

    public getNode(id: number): Node {
        return this.nodes.find(node => node.id === id);
    }

    public run(fileInput: string, userInput: string): string {
        if(this.hasCycle()) {
            return "[Error] Recipe with cycle.";
        }
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

    /**
     * Verify if the graph has cycles
     */
    public hasCycle() {
        let startingNodes: Node[] = this.nodes.filter(node => node.task.file_input || node.task.user_input);
        
        for (let index = 0; index < startingNodes.length; index++) {
            let currNode: number = startingNodes[index].id;
            if(this.visitNextNode(currNode, [])) {
                return true;
            }            
        }
        return false;
    }

    /**
     * Recursive function
     * @param currNode 
     * @param visited 
     */
    public visitNextNode(currNode: number, visited: number[]) : boolean {
        if(visited.includes(currNode)) {
            return true;
        }
        const pairs = this.edges.filter(pair => pair.from === currNode);
        if(pairs.length === 0) {
            return false;
        }

        for (let index = 0; index < pairs.length; index++) {
            const newVisited: number[] = visited.slice(0);
            newVisited.push(currNode);
            if(this.visitNextNode(pairs[index].to, newVisited)) {
                return true;
            }
        }
        return false;
    }
}

export interface Prototype {
    clone(): Prototype;
}

export class TaskDecorator extends Task {
    state: State;
    filters: Node[];
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

    addFilter(filter: Node): void {
        this.wrappee.addFilter(filter);
    }

    execute(data: Message): Message {
        return this.wrappee.execute(data);
    }
}

export class DebugDecorator extends TaskDecorator {
    execute(data: Message): Message {
        let trace: string = "Task has received << " + data.value + " >> and is going to send ";
        const receivedMsg: Message = super.execute(data);
        trace += "<< " + receivedMsg.value + " >>";
        this.content = new Message(receivedMsg.value);
        // [TODO]: dar set a propriedade trace
        return this.content;
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
        console.log("no execute do decorator");
        console.log(this);
        this.content = super.execute(data);
        return this.content;
    }
}


