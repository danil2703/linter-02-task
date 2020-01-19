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
