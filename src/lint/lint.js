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
