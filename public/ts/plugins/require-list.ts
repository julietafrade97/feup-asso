export let LoadedPlugins: string[] = [
    "FileLineReader"
]

export const AllPlugins: {[key: string]: any} = {
    "FileLineReader": require("./FileLineReader"),
    "ToUpperCase": require("./ToUpperCase"),
    "Writer": require("./Writer"),
    "InputReader": require("./InputReader"),
    "ToLowerCase": require("./ToLowerCase")
}