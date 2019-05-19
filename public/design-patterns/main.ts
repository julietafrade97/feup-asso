import { Creator, Module } from "./creational-patterns";
import { Task } from "../plugins/tasks";
import { RequireList } from "../plugins/require-list";
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
        // load plugins from plugin file (call loadPlugin)
    }

    public static getSingleton(): Main {
        if (Main.singleton == null) {
            Main.singleton = new Main();
        }
     
        return Main.singleton;
    }

    public loadPlugin(name: string) {
        const lib = RequireList[name];
        this.pluginsRegistry.addPlugin(name, lib);
        const resultLib = this.pluginsRegistry.getPlugin(name);
        const plugin = new resultLib.FileLineReader();
    }

}