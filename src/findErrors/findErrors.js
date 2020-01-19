function findErrors(string, cutString, codeError, messageError, errors) {
    const endOfSearch = string.length - cutString.length;
    const startLine = string.slice(0, string.lastIndexOf('{', endOfSearch)).split('\n').length;
    let open = 1;
    let close = 0;
    let endLine;
    let endCol;
    const startCol = string.split('\n')[startLine - 1].indexOf('{') + 1;
    const splitString = string.split('\n');
    let startOfLoop = startCol;
    for (let i = startLine - 1; i < splitString.length; i++) {
        for (let j = startOfLoop; j < splitString[i].length; j++) {
            if (splitString[i][j] === '{') {
                open += 1;
            }
            if (splitString[i][j] === '}') {
                close += 1;
            }
            if (close === open) {
                endLine = i + 1;
                endCol = j + 2;
                break;
            }
        }
        startOfLoop = 0;
        if (close === open) {
            break;
        }
    }
    errors.push({
        code: codeError,
        error: messageError,
        location: {
            start: { column: startCol, line: startLine },
            end: { column: endCol, line: endLine },
        },
    });
}
