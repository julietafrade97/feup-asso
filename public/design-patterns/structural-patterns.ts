import { Task, Message, Recipe, Node } from "../plugins/tasks";
import { State } from "./behavioral-patterns";
import { Module } from "./creational-patterns";
import { LoadedPlugins, AllPlugins } from "../plugins/require-list";

export class TaskDecorator extends Task {
    state: State;
    filters: Task[];

    constructor(public wrappee: Task) {
        super();
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
        this.content = new Message(this.currentState(receivedMsg.value), receivedMsg.from, receivedMsg.to);
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

/**
 * Map to get the existing modules
 */
class Registry {
    public modules: {[key: string]: Module} = {};

    public getModule(key: string): Module {
        return this.modules.key;
    }

    public addModule(key: string, m: Module) {
        this.modules.key = m;
    }

    public removeFactory(key: string) {
        this.modules.key.uninstall();
        delete this.modules.key;
    }
}

export class Facade {
    public nodeIdCount: number = 0;
    public modulesRegistry: Registry;

    public currentRecipe: Recipe;
    public storedRecipes: Recipe[];

    constructor() {
        LoadedPlugins.forEach(pluginName => this.loadPlugin(pluginName));

    }

    /**
     * Load one plugin from the ones in the list of existing plugins
     * @param name plugin name
     */
    public loadPlugin(name: string) {
        const m: Module = new Module(name);
        this.modulesRegistry.addModule(name, m);
        m.install();
    }

    /**
     * Install a plugin (create his respective module)
     */
    public installPlugin(name: string) {
        if(!AllPlugins.hasOwnProperty(name)) {
            console.log("Invalid plugin name.");
            return;
        }
        this.loadPlugin(name);
        LoadedPlugins.push(name);
    }

    /**
     * Uninstall a loaded plugin
     * @param name plugin's name
     */
    public uninstallPlugin(name: string) {
        if(LoadedPlugins.indexOf(name) == -1) {
            console.log("Invalid plugin name.");
            return;
        }
        this.modulesRegistry.removeFactory(name);
    }

    public newRecipe() {
        this.currentRecipe = new Recipe();
        this.nodeIdCount = 0;
    }

    public addNode(taskType: string) {
        this.nodeIdCount++;
        const m: Module = this.modulesRegistry.getModule(taskType);
        const t:Task = m.factory.createTask();
        this.currentRecipe.addNode(this.nodeIdCount, t);
    }

    public emptyRecipe() {
        this.currentRecipe.nodes.forEach(node => this.deleteNode(node.id));
    }

    //[TODO]
    public deleteNode(id: number) {

    }

    /**
     * Put the currentRecipe in the storedRecipes array
     */
    public saveRecipe(name: string) {
        this.currentRecipe.name = name;
        this.storedRecipes.push(this.currentRecipe);
    }

    /**
     * 
     * @param recipeName the name of the recipe we want to join with the current one
     */
    public loadRecipe(recipeName: string) {
        const recipe: Recipe = this.storedRecipes.find(r => r.name === recipeName);
        recipe.nodes.forEach(n => {
            this.currentRecipe.addNode(this.nodeIdCount + n.id, n.task);// [TODO]: usar o design pattern Prototype para uma Task ter um método clone
        });
        recipe.edges.forEach(e => {
            this.currentRecipe.edges.push([e[0] + this.nodeIdCount, e[1] + this.nodeIdCount])
        });
        this.nodeIdCount += recipe.nodes.length;
    }
}