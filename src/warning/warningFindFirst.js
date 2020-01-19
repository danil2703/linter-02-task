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
