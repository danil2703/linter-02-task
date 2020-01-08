const json = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "xl" } }
    ]
}`;

lint(json);

function lint(string){
    let object = JSON.parse(string);
    let errors = [];
    let data = {
        h1: false,
        h2: false,
        warning: {
            firstText: false,
            firstBlock: false,
            placeh: false
        }
    }

    errors = lintMain(object, string, errors, data);
    console.log(errors);
    return errors;
}

function lintMain(object, string, errors, data){
    if(Array.isArray(object.content)) {
        object.content.forEach(item => {
            errors = lintMain(item, string, errors, data);
        });
    } else {
        if(typeof(object.content) == 'object') {
            for(key in object.content) {
                errors = lintMain(object.content[key], string, errors, data);
            }
        }
    }

    if(object.block == 'text') {
        errors = lintText(object, string, errors, data);
    }

    if(object.block == 'warning') {
        errors = lintWarning(object, string, errors, data);
        errors = lintWarningWhoFirst(object, string, errors, data);
    }

    if(!data.warning.placeh)
        errors.forEach((item, index, arr) => {
            if(item.code == 'WARNING.INVALID_BUTTON_POSITION') {
                arr.splice(index, 1);
            }
        })
    return errors;
}

function lintWarning(object, string, errors, data) {
    if(Array.isArray(object.content)) {
        object.content.forEach(item => {
            errors = lintWarning(item, string, errors, data);
        })
    }
    if(object.block == 'text' && object.mods) {
        if(!data.warning.firstText) {
            data.warning.firstText = object.mods.size;
            return errors;
        }
        if(data.warning.firstText !== object.mods.size) {
            errors.push({
                "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                "error": "Тексты в блоке warning должны быть одного размера",
                "location": {
                    "start": { "column": 1, "line": 1 },
                    "end": { "column": 2, "line": 22 }
                }
            });
        }
    }
    if(object.block == 'button') {
        errors = lintWarningButton(object, string, errors, data);
        if(!data.warning.firstBlock) {
            data.warning.firstBlock = 'button';
        }
    }
    if(object.block == 'placeholder') {
        errors = lintWarningPlaceholder(object, string, errors, data);
        if(!data.warning.firstBlock) {
            data.warning.firstBlock = 'placeholder';
        }
        data.warning.placeh = true;
    }

    return errors;
}

function lintWarningPlaceholder(object, string, errors, data) {
    let size = object.mods.size;
    if(size !== 's' && size !== 'm' && size !== 'l') {
        errors.push({
            "code": "WARNING.INVALID_PLACEHOLDER_SIZE",
            "error": "Допустимые размеры для блока placeholder в блоке warning: s, m, l",
            "location": {
                "start": { "column": 1, "line": 1 },
                "end": { "column": 2, "line": 22 }
            }
        });
    }
    return errors;
}

function lintWarningWhoFirst(object, string, errors, data) {
    if(data.warning.firstBlock == 'button') {
        errors.push({
            "code": "WARNING.INVALID_BUTTON_POSITION",
            "error": "Блок button в блоке warning не может находиться перед блоком placeholder",
            "location": {
                "start": { "column": 1, "line": 1 },
                "end": { "column": 2, "line": 22 }
            }
        });
    }
    return errors;
}

function lintWarningButton(object, string, errors, data) {
    let sizes = ['s', 'm', 'l', 'xl', 'xxl'];
    let trueSize;
    sizes.forEach((item, index, arr) => {
        if(item === data.warning.firstText) {
            trueSize = arr[index+1];
        }
    });
    if(object.mods.size !== trueSize) {
        errors.push({
            "code": "WARNING.INVALID_BUTTON_SIZE",
            "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
            "location": {
                "start": { "column": 1, "line": 1 },
                "end": { "column": 2, "line": 22 }
            }
        });
    }
    return errors;
}

function lintText(object, string, errors, data) {
    if(object.mods) {
        if(object.mods.type == 'h1') {
            if(data.h1) {
                errors.push({
                    "code": "TEXT.SEVERAL_H1",
                    "error": "h1 должен быть 1",
                    "location": {
                        "start": { "column": 1, "line": 1 },
                        "end": { "column": 2, "line": 22 }
                    }
                });
            }
            data.h1 = true;
        }
        if(object.mods.type == 'h2') {
            if(!data.h1) {
                errors.push({
                    "code": "TEXT.INVALID_H2_POSITION",
                    "error": "Заголовок h2 не должен быть перед h1",
                    "location": {
                        "start": { "column": 1, "line": 1 },
                        "end": { "column": 2, "line": 22 }
                    }
                });
            }
            data.h2 = true;
        }
        if(object.mods.type == 'h3') {
            if(!data.h2) {
                errors.push({
                    "code": "TEXT.INVALID_H3_POSITION",
                    "error": "Заголовок h3 не должен быть перед h2",
                    "location": {
                        "start": { "column": 1, "line": 1 },
                        "end": { "column": 2, "line": 22 }
                    }
                });
            }
        }
    }
    return errors;
}
