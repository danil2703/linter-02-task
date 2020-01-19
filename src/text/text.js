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
