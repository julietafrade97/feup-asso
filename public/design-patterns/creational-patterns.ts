import { Task } from "../plugins/tasks";
import { AllPlugins } from "../plugins/require-list";
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
     * Install a plugin (get the correspondent class Creator a.k.a factory)
     */
    install(): void {
        this.lib = AllPlugins[name];
        this. factory = this.lib.Creator.getInstance();
    }
    /**
     * Asks the factory to execute, create a new task instance 
     */
    execute(): Task {
        return this.factory.createTask();
    }
    /**
     * Uninstall a plugin (deleted the unique factory instance)
     */
    uninstall(): void {
        this.lib = null;
        this.factory = null;
    }
}

