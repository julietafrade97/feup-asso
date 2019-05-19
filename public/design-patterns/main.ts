import { Creator, Module } from "./creational-patterns";
export class Main {
    public static singleton: Main = null;
    public taskFactories: Creator[] = [];
    public modules: Module[] = [];

    public static getSingleton(): Main {
        if (Main.singleton == null) {
            Main.singleton = new Main();
        }
     
        return Main.singleton;
    }

}
const x = require("../plugins/FileLineReader/FileLineReader");
console.log(x);
