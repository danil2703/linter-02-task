const testJson = [`{
    "block": "warning",
    "content": [
        {
            "block": "placeholder",
            "mods": { "size": "m" }
        },
        {
            "elem": "content",
            "content": [
                {
                    "block": "text",
                    "mods": { "size": "m" }
                },
                {
                    "block": "text",
                    "mods": { "size": "l" }
                }
            ]
        }
    ]
}`,
`{
    "block": "warning",
    "content": [
        {
            "block": "text",
            "mods": { "size": "m" }
        },
        {
            "elem": "content",
            "content": [
                {
                    "block": "text",
                    "mods": { "size": "m" }
                },
                {
                    "block": "text",
                    "mods": { "size": "m" },
                    "content": {
                        {
                            "block": "text",
                            "mods": { "size": "m" }
                        }
                    }
                }
            ]
        }
    ]
}`,
];

const err = [
    {
        code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
        error: "Тексты в блоке warning должны быть одного размера",
        location: {
            start: { column: 1, line: 1 },
            end: { column: 2, line: 22 },
        },
    },
];
describe("блок Warning", () => {
    testJson.forEach((item) => {
        it("Текст в блоке одного размера", () => {
            assert.equal(lint(item)[0].code, err[0].code);
        });
    });
});

function f() {
    return 3;
}
