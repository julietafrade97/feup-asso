import { Task } from "../plugins/tasks";

export class Creator {
    public static singleton: Creator = null;

    constructor() { }

    public createTask(): Task {
        return null;
    }

    public static getSingleton(): Creator{
        if (Creator.singleton == null) {
            Creator.singleton = new Creator();
        }
     
        return Creator.singleton;
    }
}

/**
 * Design pattern used to implement the concept of software modules
 */
export class Module {
    /**
     * Singleton instance that represents a task factory
     */
    factory: Creator;
    lib: any = null;

    constructor(public name: string) {}
    /**
     * Install a plugin (write in a file of loaded plugins)
     */
    install(): void {
        //get file of new task installed:
        //const lib = require("../../plugins/" + this.name)
        //
        //write in the json file the installed plugin name (this.name)
    }
    /**
     * Creates the factory 
     */
    execute(): Creator {
        //this. factory = lib.Creator.getInstance();
        return this.factory;
    }
    /**
     * Uninstall a plugin (deleted from the file of loaded plugins)
     */
    uninstall(): void {
        this.lib = null;
        this.factory = null;
    }
}

