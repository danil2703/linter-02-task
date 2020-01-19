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

function lintGrid(content, string, gridSize, errors, data) {
    let marketing = 0;
    const marketingBlocks = ['commercial', 'offer'];
    content.forEach((item) => {
        if (item.elem === 'fraction' && item.elemMods) {
            if (marketingBlocks.includes(item.content[0].block)) {
                marketing += +item.elemMods['m-col'];
            }
        }
    });
    if (marketing > gridSize / 2) {
        const message = "Маркетинговые блоки не могут занимать больше половины от всех колонок блока grid";
        const code = "GRID.TOO_MUCH_MARKETING_BLOCKS";
        findErrors(string, data.str, code, message, errors);
    }
}

function lint(string) {
    const object = JSON.parse(string);
    const errors = [];
    const data = {
        h1: false,
        h2: false,
        warning: {
            firstText: false,
            firstBlock: false,
        },
        str: string,
    };
    if (Array.isArray(object)) {
        object.forEach((item) => {
            lintMain(item, string, errors, data);
        });
    } else {
        lintMain(object, string, errors, data);
    }
    return errors;
}

function lintMain(object, string, errors, data) {
    if (object.block) {
        data.str = data.str.slice(data.str.indexOf(object.block) + object.block.length);
    }
    if (object.block === 'grid' && object.mods) {
        lintGrid(object.content, string, object.mods['m-columns'], errors, data);
    }
    if (object.block === 'text') {
        lintText(object, string, errors, data);
    }
    if (object.block === 'warning') {
        data.warning.firstBlock = false;
        data.warning.firstText = false;
        data.warningString = string;
        data.warning.firstText = findFirst(object, data);
        lintWarning(object, string, errors, data);
    }
    if (Array.isArray(object.content)) {
        object.content.forEach((item) => {
            lintMain(item, string, errors, data);
        });
    } else if (typeof (object.content) === 'object') {
        lintMain(object.content, string, errors, data);
    }
}

function lintText(object, string, errors, data) {
    if (object.mods) {
        if (object.mods.type === 'h1') {
            if (data.h1) {
                const message = "Заголовок первого уровня на странице должен быть единственным";
                const code = "TEXT.SEVERAL_H1";
                findErrors(string, data.str, code, message, errors);
            }
            data.h1 = true;
        }
        if (object.mods.type === 'h2') {
            if (!data.h1) {
                const message = "Заголовок второго уровня не может находиться перед заголовком первого уровня";
                const code = "TEXT.INVALID_H2_POSITION";
                findErrors(string, data.str, code, message, errors);
            }
            data.h2 = true;
        }
        if (object.mods.type === 'h3') {
            if (!data.h2) {
                const message = "Заголовок третьего уровня не должен быть перед второго уровня";
                const code = "TEXT.INVALID_H3_POSITION";
                findErrors(string, data.str, code, message, errors);
            }
        }
    }
}

function lintWarning(object, string, errors, data) {
    if (object.block) {
        data.warningString = data.warningString
            .slice(data.warningString.indexOf(object.block) + object.block.length);
    }
    if (object.block === 'placeholder') {
        lintWarningPlaceholder(object, string, errors, data);
        if (!data.warning.firstBlock) {
            data.warning.firstBlock = 'placeholder';
        }
    }
    if (object.block === 'text' && object.mods) {
        if (data.warning.firstText !== object.mods.size) {
            const message = "Тексты в блоке warning должны быть одного размера";
            const code = "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL";
            findErrors(string, data.str, code, message, errors);
        }
    }
    if (object.block === 'button') {
        lintWarningButton(object, string, errors, data);
        if (!data.warning.firstBlock) {
            const message = "Блок button в блоке warning не может находиться перед блоком placeholder";
            const code = "WARNING.INVALID_BUTTON_POSITION";
            findErrors(string, data.warningString, code, message, errors);
        }
    }
    if (Array.isArray(object.content)) {
        object.content.forEach((item) => {
            if (item.block !== 'warning') {
                lintWarning(item, string, errors, data);
            }
        });
    } else if (typeof (object.content) === 'object') {
        for (const key in object.content) {
            lintWarning(object.content[key], string, errors, data);
        }
    }
}

function lintWarningButton(object, string, errors, data) {
    const sizes = ['s', 'm', 'l', 'xl', 'xxl'];
    let trueSize;
    sizes.forEach((item, index, arr) => {
        if (item === data.warning.firstText) {
            trueSize = arr[index + 1];
        }
    });
    if (object.mods) {
        if (object.mods.size !== trueSize) {
            const message = "Размер кнопки блока warning должен быть на 1 шаг больше эталонного";
            const code = "WARNING.INVALID_BUTTON_SIZE";
            findErrors(string, data.warningString, code, message, errors);
        }
    }
}

function findFirst(object, data) {
    if (object.block === 'text' && object.mods && object.mods.size && !data.warning.firstText) {
        return object.mods.size;
    }
    if (Array.isArray(object.content)) {
        object.content.forEach((item) => {
            if (!data.warning.firstText) {
                data.warning.firstText = findFirst(item, data);
            }
        });
    } else if (typeof (object.content) === 'object') {
        for (const key in object.content) {
            data.warning.firstText = findFirst(object.content[key], data);
        }
    }
    return data.warning.firstText;
}

function lintWarningPlaceholder(object, string, errors, data) {
    let size;
    if (object.mods) {
        size = object.mods.size;
    }
    if (size !== 's' && size !== 'm' && size !== 'l') {
        const message = "Допустимые размеры для блока placeholder в блоке warning: s, m, l";
        const code = "WARNING.INVALID_PLACEHOLDER_SIZE";
        findErrors(string, data.warningString, code, message, errors);
    }
}
