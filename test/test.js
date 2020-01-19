describe("блок Warning", () => {
    warningFirstRules.forEach((item, index) => {
        it("текст одинакового размера", function() {
            let equal = true;
            let data = lint(item);
            lint(item).forEach((element, i) => {
                if(element.code !== warningFirstRulesResults[index][i].code) {
                    equal = false;
                }
            });
            if(warningFirstRulesResults[index].length > data.length) {
                equal = false;
            }
            assert.equal(true, equal);
        });
    });
    warningButtonSize.forEach((item, index) => {
        it("Размер кнопки блока warning должен быть на 1 шаг больше эталонного", function() {
            let equal = true;
            let data = lint(item);
            data.forEach((element, i, arr) => {
                if(element.code !== warningButtonSizeResults[index][i].code) {
                    equal = false;
                }
            });
            if(warningButtonSizeResults[index].length > data.length) {
                equal = false;
            }
            assert.equal(true, equal);
        });
    });
    warningWhoFirst.forEach((item, index) => {
        it("Блок button в блоке warning не может находиться перед блоком placeholder", function() {
            let equal = true;
            let data = lint(item);
            data.forEach((element, i, arr) => {
                if(element.code !== warningWhoFirstResults[index][i].code) {
                    equal = false;
                }
            });
            if(warningWhoFirstResults[index].length > data.length) {
                equal = false;
            }
            assert.equal(true, equal);
        });
    });
    warningPlaceholder.forEach((item, index) => {
        it("Допустимые размеры для блока placeholder", function() {
            let equal = true;
            let data = lint(item);
            data.forEach((element, i, arr) => {
                if(element.code !== warningPlaceholderResults[index][i].code) {
                    equal = false;
                }
            });
            if(warningPlaceholderResults[index].length > data.length) {
                equal = false;
            }
            assert.equal(true, equal);
        });
    });
});

describe("Правила для текста", () => {
    h1.forEach((item, index) => {
        it("Заголовок первого уровня должен быть единственным", function() {
            let equal = true;
            let data = lint(item);
            data.forEach((element, i) => {
                if(element.code !== h1Results[index][i].code) {
                    equal = false;
                }
            });
            if(h1Results[index].length > data.length) {
                equal = false;
            }
            assert.equal(true, equal);
        });
    });
    h2.forEach((item, index) => {
        it("Заголовок второго уровня не может находиться перед заголовком первого уровня", function() {
            let equal = true;
            let data = lint(item);
            data.forEach((element, i) => {
                if(element.code !== h2Results[index][i].code) {
                    equal = false;
                }
            });
            if(h2Results[index].length > data.length) {
                equal = false;
            }
            assert.equal(true, equal);
        });
    });
    h3.forEach((item, index) => {
        it("Заголовок третьего уровня не может находиться перед заголовком второго уровня", function() {
            let equal = true;
            let data = lint(item);
            data.forEach((element, i) => {
                if(element.code !== h3Results[index][i].code) {
                    equal = false;
                }
            });
            if(h3Results[index].length > data.length) {
                equal = false;
            }
            assert.equal(true, equal);
        });
    });
});

describe("блок Grid", () => {
    it("Заголовок третьего уровня не может находиться перед заголовком второго уровня", function() {
        grid.forEach((item, index) => {
            let equal = true;
            let data = lint(item);
            data.forEach((element, i) => {
                if(element.code !== gridResults[index][i].code) {
                    equal = false;
                }
            });
            if(gridResults[index].length > data.length) {
                equal = false;
            }
            assert.equal(true, equal);
        });
    });
});

describe("Поиск ошибок", () => {
    positionOfErrors.forEach((item, index) => {
        it("Заголовок третьего уровня не может находиться перед заголовком второго уровня", function() {
            let equal = true;
            let data = lint(item);
            lint(item).forEach((element, i) => {
                if(element.location.start.line !== positionOfErrorsResults[index][i].location.start.line ||
                   element.location.start.column !== positionOfErrorsResults[index][i].location.start.column ||
                   element.location.end.column !== positionOfErrorsResults[index][i].location.end.column ||
                   element.location.end.line !== positionOfErrorsResults[index][i].location.end.line) {
                    equal = false;
                }
            });
            if(positionOfErrorsResults[index].length > data.length) {
                equal = false;
            }
            assert.equal(true, equal);
        });
    });
});