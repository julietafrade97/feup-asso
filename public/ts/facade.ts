import { Registry } from "./registry";
import { Recipe, Task } from "./tasks";
import { LoadedPlugins, AllPlugins } from "./plugins/require-list";
import { Module } from "./creational";


export class Facade {
    public nodeIdCount: number = 0;
    public modulesRegistry: Registry = new Registry();

    public currentRecipe: Recipe = new Recipe();
    public storedRecipes: Recipe[] = [];

    constructor() {
        LoadedPlugins.forEach(pluginName => this.loadPlugin(pluginName));
        this.addNode("FileLineReader")
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
        return this.currentRecipe.addNode(this.nodeIdCount, t, taskType);
    }

    public connectNodes(node1: number, node2: number) {
        this.currentRecipe.connectNodes(node1, node2);
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
            this.currentRecipe.addNode(this.nodeIdCount + n.id, n.task, n.label);// [TODO]: usar o design pattern Prototype para uma Task ter um método clone
        });
        recipe.edges.forEach(e => {
            this.currentRecipe.edges.push([e[0] + this.nodeIdCount, e[1] + this.nodeIdCount])
        });
        this.nodeIdCount += recipe.nodes.length;
    }
}