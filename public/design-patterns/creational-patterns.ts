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

    constructor(public taskType: string) {}
    /**
     * Install a plugin (write in a file of loaded plugins)
     */
    install(): void {

    }
    /**
     * Creates the factory 
     */
    execute(): Creator {
        return this.factory;
    }
    /**
     * Uninstall a plugin (deleted from the file of loaded plugins)
     */
    uninstall(): void {
        
    }
}

