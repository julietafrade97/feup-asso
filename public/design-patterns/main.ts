import { Creator, Module } from "./creational-patterns";
import { Task } from "../plugins/tasks";
import { RequireList } from "../plugins/require-list";

/**
 * If the module stores the lib, we don't need the Registry
 */
class Registry {
    public plugins: {[key: string]: any} = {};

    public getPlugin(key: string): any {
        return this.plugins.key;
    }

    public addPlugin(key: string, plugin: any) {
        return this.plugins.key = plugin;
    }
}
class Main {
    public static singleton: Main = null;
    public pluginsRegistry: Registry = new Registry();
    public taskFactories: Creator[] = [];
    public modules: Module[] = [];

    constructor() {
        //open plugin file
        //load plugins from plugin file (call loadPlugin for each line/plugin)
    }

    public static getSingleton(): Main {
        if (Main.singleton == null) {
            Main.singleton = new Main();
        }
     
        return Main.singleton;
    }

    /**
     * Load one plugin from the ones in the json file (already installed plugins)
     * @param name plugin name
     */
    public loadPlugin(name: string) {
        const lib = RequireList[name];
        this.pluginsRegistry.addPlugin(name, lib);
        const module = new Module(name);
        this.modules.push(module);
        this.taskFactories.push(module.execute());
    }

    /**
     * Install a plugin and create his respective module and factory
     * @param name plugin name
     */
    public installPlugin(name: string) {
        const module = new Module(name);
        this.modules.push(module);
        module.install();
        this.taskFactories.push(module.execute());
    }

    /**
     * Uninstall a plugin and remove his module and factory
     * from this.taskFactories and this.modules
     * @param name plugin name
     */
    public uninstallPlugin(name: string) {
        this.modules.find(module => module.name === name).uninstall;
        //don't now if factory disappears from this.taskFactories since is a singleton
        //that we set to null in module uninstall method.
        const index = this.modules.findIndex(module => module.name === name);
        if (index > -1) {
            this.modules.splice(index, 1);//removes module from array
        }
    }

}