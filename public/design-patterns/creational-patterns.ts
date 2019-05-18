import { Task } from "./tasks";

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
export interface Module {
    /**
     * Singleton instance that represents a task factory
     */
    factory: Creator;
    /**
     * Install a plugin (write in a file of loaded plugins)
     */
    install(): void;
    /**
     * Creates the factory 
     */
    execute(): Creator;
    /**
     * Uninstall a plugin (deleted from the file of loaded plugins)
     */
    uninstall(): void;
}

