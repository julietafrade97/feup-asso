import { Registry } from "./registry";
import { Recipe, Task } from "./tasks";
import { LoadedPlugins, AllPlugins } from "./plugins/require-list";
import { Module } from "./creational";


export class Facade {
    public nodeIdCount: number = 0;
    public modulesRegistry: Registry = new Registry();

    public currentRecipe: Recipe = new Recipe(null);
    public storedRecipes: Recipe[] = [];

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
        if (LoadedPlugins.indexOf(name) == -1) {
            console.log("Invalid plugin name.");
            return;
        }

        // Remove the plugin from the LoadedPlugins list.
        LoadedPlugins.splice(LoadedPlugins.indexOf(name), 1);
        this.modulesRegistry.removeFactory(name);
    }

    public newRecipe() {
        this.currentRecipe = new Recipe(null);
        this.nodeIdCount = 0;
    }

    public addNode(taskType: string) {
        this.nodeIdCount++;
        const m: Module = this.modulesRegistry.getModule(taskType);
        const t: Task = m.factory.createTask();
        return this.currentRecipe.addNode(this.nodeIdCount, t, taskType);
    }

    public deleteNode(id: number) {
        // Establish missing connections.
        this.currentRecipe.addMissingEdges(id);

        // Delete edges that are connected to the node.
        this.currentRecipe.deleteEdgesConnectedTo(id);

        // Actually delete the node.
        this.currentRecipe.deleteNode(id);
    }

    public deleteEdge(from: number, to: number) {
        this.currentRecipe.deleteEdge(from, to);
    }

    public connectNodes(node1: number, node2: number) {
        this.currentRecipe.connectNodes(node1, node2);
    }

    public emptyRecipe() {
        this.currentRecipe.nodes.forEach(node => this.deleteNode(node.id));
    }


    /**
     * Put the currentRecipe in the storedRecipes array
     */
    public saveRecipe(name: string) {
        const copy: Recipe = <Recipe>this.currentRecipe.clone();
        copy.name = name;

        const isDuplicate = this.storedRecipes.findIndex(recipe => recipe.name === name);

        if (isDuplicate !== -1) {
            console.log('Found duplicate.');
            this.storedRecipes.splice(isDuplicate, 1);
            console.log(this.storedRecipes);
        }

        this.storedRecipes.push(copy);
    }

    /**
     * 
     * @param recipeName the name of the recipe we want to join with the current one
     */
    public loadRecipe(recipeName: string) {
        const recipe: Recipe = this.storedRecipes.find(r => r.name === recipeName);
        recipe.nodes.forEach(n => {
            this.currentRecipe.addNode(this.nodeIdCount + n.id, n.task, n.label);// [TODO]: usar o design pattern Prototype para uma Task ter um método clone
        });
        recipe.edges.forEach(e => {
            this.currentRecipe.edges.push({ from: e.from + this.nodeIdCount, to: e.to + this.nodeIdCount})
        });
        this.nodeIdCount += recipe.nodes.length;
    }

    /**
     * 
     * @param nodeId The node ID whose state will be changed.
     */
    public changeNodeState(nodeId: number) {
        const node = this.currentRecipe.getNode(nodeId);
        node.changeState();
        console.log('Changed state!');
    }

    public isNodeIdle(nodeId: number) {
        const node = this.currentRecipe.getNode(nodeId);
        return node.isActive === 0;
    }

    /**
     * Add decorator to node to change its output value
     * @param nodeId The node to which we will add decorator
     * @param newOutput The new ouput value that the node will send to the next node
     */
    public changeNodeOutput(nodeId: number, newOutput: string) {
        const node = this.currentRecipe.getNode(nodeId);
        node.changeOutput(newOutput);
    }

    /**
     * Removes node decorator that was changing its output value
     * @param nodeId The node from which we will remove the decorator
     */
    public disableChangeNodeOutput(nodeId: number) {
        const node = this.currentRecipe.getNode(nodeId);
        node.disableChangeOutput();
    }

    /**
     * 
     * @param nodeId The node from which we'll extract the trace message.
     */
    public getTraceLog(nodeId: number): string {
        return this.currentRecipe.getNode(nodeId).getTraceLog();
    }

    /**
     * Add decorator to node to enable debug mode
     * @param nodeId The node to which we will add decorator
     */
    public enableDebug(nodeId: number) {
        const node = this.currentRecipe.getNode(nodeId);
        node.enableDebug();
    }

    public execute(fileInput: string, userInput: string): string {
        return this.currentRecipe.run(fileInput, userInput);
    }
}