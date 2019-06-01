import { Module } from "./creational";

/**
 * Map to get the existing modules
 */
export class Registry {
    public modules: {[key: string]: Module} = {};

    public getModule(key: string): Module {
        return this.modules[key];
    }

    public addModule(key: string, m: Module) {
        this.modules[key] = m;
    }

    public removeFactory(key: string) {
        this.modules[key].uninstall();
        delete this.modules[key];
    }
}