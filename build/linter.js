/*const json = `{
    "block": "page",
    "content": [
        {
            "block": "text",
            "mods": { "type": "h3" }
        },
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
    ]
}`;

lint(json);*/

const data = {
    h1: false,
    h2: false
}

function lint(string){
    let object = JSON.parse(string);
    let errors = [];

    errors = lintMain(object, string, errors);
    console.log(errors);
    return errors;
}

function lintMain(object, string, errors){

    if(Array.isArray(object.content)) {
        object.content.forEach(item => {
            //string.slice(string.indexOf())
            errors = lintMain(item, string, errors);
        });
    } else {
        if(typeof(object.content) == 'object') {
            for(key in object.content) {
                errors = lintMain(object.content[key], string, errors);
            }
        }
    }

    if(object.block == 'text') {
        errors = lintText(object, string, errors);
    }

    return errors;
}

function lintText(object, string, errors) {
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
    return errors;
}
