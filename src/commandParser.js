// Checks if string is a command
const getCommand = (parsedString) => {
    if(parsedString[0] === '/') {
        let res = parsedString.slice(1)
        return res
    } else {
        return null
    }
}

const parseArguments = (parsedString) => {
    let split = parsedString.split(" ", 2)
    return split;
}

// commandsDictionary format: {
//  [command: String]: (arg: String) => void   
// }
export const handleCommand = (commandsDictionary, parsedString) => {
    let parsedCommand = getCommand(parsedString);
    let [command, args] = parseArguments(parsedCommand);
    if(commandsDictionary.hasOwnProperty(command)) {
        commandsDictionary.command(args)
        return parsedCommand
    } else {
        return null;
    }
}