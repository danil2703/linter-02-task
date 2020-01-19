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
