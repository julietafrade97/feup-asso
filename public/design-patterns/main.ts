export class Main {
    public static singleton: Main = null;
    public static getSingleton(): Main{
        if (Main.singleton == null) {
            Main.singleton = new Main();
        }
     
        return Main.singleton;
    }
}