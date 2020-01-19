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
