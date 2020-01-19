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
