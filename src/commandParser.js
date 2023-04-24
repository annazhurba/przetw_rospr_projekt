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
    let command = parsedString.split(" ", 1)
    let args = parsedString.substr(parsedString.indexOf(" ") + 1)
    return [command, args];
}

// commandsDictionary format: {
//  [command: String]: (arg: String) => void   
// }
export const handleCommand = (commandsDictionary, parsedString) => {
    let parsedCommand = getCommand(parsedString);
    if(parsedCommand === null) return null;
    let [command, args] = parseArguments(parsedCommand);
    if(commandsDictionary.hasOwnProperty(command)) {
        commandsDictionary[command](args)
        return parsedCommand
    } else {
        return null;
    }
}