const warningFirstRules= [`{
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
            "block": "placeholder",
            "mods": { "size": "m" }
        },
        {
            "elem": "content",
            "content": [
                {
                    "block": "text",
                    "mods": { "size": "s" }
                },
                {
                    "block": "text",
                    "mods": { "size": "l" }
                },
                {
                    "block": "text",
                    "mods": { "size": "l" }
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
            "block": "placeholder",
            "mods": { "size": "m" }
        },
        {
            "elem": "content",
            "content": [
                {
                    "block": "text",
                    "mods": { "size": "l" }
                },
                {
                    "block": "text",
                    "mods": { "size": "l" }
                },
                {
                    "block": "text",
                    "mods": { "size": "l" }
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
            "block": "placeholder",
            "mods": { "size": "m" }
        },
        {
            "elem": "content",
            "content": [
                {
                    "block": "text",
                    "mods": { "size": "xl" }
                },
                {   
                    "block": "page",
                    "content": [
                        {
                            "block": "page",
                            "content": [
                                {
                                    "block": "text",
                                    "mods": { "size": "l" }
                                },
                                {
                                    "block": "text",
                                    "mods": { "size": "l" }
                                },
                                {
                                    "block": "text",
                                    "mods": { "size": "l" }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}`,
`{
    "block": "warning",
    "content": [
        {
            "block": "placeholder",
            "mods": { "size": "m" },
            "content": [{
                    "block": "text",
                    "mods": { "size": "xl" }
                }]
        },
        {
            "elem": "content",
            "content": [
                {
                    "block": "text",
                    "mods": { "size": "l" }
                },
                {
                    "block": "text",
                    "mods": { "size": "l" }
                },
                {
                    "block": "text",
                    "mods": { "size": "l" }
                }
            ]
        }
    ]
}`
];

const warningFirstRulesResults = [
    [
        {
            code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
        }
    ],
    [
        {
            code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
        },
        {
            code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
        },
        {
            code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
        }
    ],
    [],
    [
        {
          code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
        },
        {
          code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
        },
        {
          code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
        }
    ],
    [
        {
          code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
        },
        {
          code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
        },
        {
          code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
        }
    ]
];

const warningButtonSize = [
    `{
        "block": "warning",
        "content": [
            { "block": "text", "mods": { "size": "l" } },
            { "block": "button", "mods": { "size": "l" } }
        ]
    }`,
    `{
        "block": "warning",
        "content": [
            { "block": "text", "mods": { "size": "l" } },
            { "block": "button", "mods": { "size": "xl" } }
        ]
    }`,
    `{
        "block": "warning",
        "content": [
            { "block": "text", "mods": { "size": "xl" } },
            { 
              "block": "page",
              "content":  
                [
                    { 
                        "block": "button", 
                        "mods": { "size": "xl" } 
                    }
                ]
            }
        ]
    }`
];

const warningButtonSizeResults = [
    [{
        code: 'WARNING.INVALID_BUTTON_SIZE',
      },
      {
        code: 'WARNING.INVALID_BUTTON_POSITION',
      }
    ],
    [
      {
        code: 'WARNING.INVALID_BUTTON_POSITION',
      }
    ],
    [
        {
            code: 'WARNING.INVALID_BUTTON_SIZE',
        },
        {
            code: 'WARNING.INVALID_BUTTON_POSITION',
        }
    ]
];

const warningWhoFirst = [
    `{
        "block": "warning",
        "content": [
            { "block": "placeholder", "mods": { "size": "m" } },
            { "block": "button", "mods": { "size": "m" } }
        ]
    }`,
    `{
        "block": "warning",
        "content": [
            { "block": "button", "mods": { "size": "m" } },
            { "block": "placeholder", "mods": { "size": "m" } }
        ]
    }
    `,
    `
    {
        "block": "warning",
        "content": [
            { "block": "button", "mods": { "size": "m" } },
            { "block": "placeholder", "mods": { "size": "m" } }
        ]
    }
    `,
    
];

const warningWhoFirstResults = [
    [
        {
            code: 'WARNING.INVALID_BUTTON_SIZE'
        }
    ],
    [
        {
            code: 'WARNING.INVALID_BUTTON_SIZE',
        },
        {
            code: 'WARNING.INVALID_BUTTON_POSITION',
        }
    ],
    [
        {
            code: 'WARNING.INVALID_BUTTON_SIZE',
        },
        {
            code: 'WARNING.INVALID_BUTTON_POSITION',
        }
    ]
];


const warningPlaceholder = [
    `{
        "block": "warning",
        "content": [
            { "block": "placeholder", "mods": { "size": "m" } }
        ]
    }`,
    `{
        "block": "warning",
        "content": [
            { "block": "placeholder", "mods": { "size": "xxl" } }
        ]
    }`,
    `{
        "block": "warning",
        "content": [
            {
                "block": "placeholder",
                "mods": { "size": "xs" }
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
    }`
];

const warningPlaceholderResults = [
    [
    ],
    [
        {
            code: 'WARNING.INVALID_PLACEHOLDER_SIZE',
        }
    ],
    [
        {
            code: 'WARNING.INVALID_PLACEHOLDER_SIZE',
        },
        {
            code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
        },
    ]
];


const h1 = [
    `[
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
    ]`,
    `[
        {
            "block": "text",
            "mods": { "type": "h1" }
        },
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
    ]`,
    `[
        {
            "block": "text",
            "mods": { "type": "h1" }
        },
        {
            "block": "text",
            "mods": { "type": "h1" }
        },
        {
            "block": "page",
            "content": {
                "block": "text",
                "mods": { "type": "h1" }
            }
        }
    ]`
];


const h1Results = [
    [
    ],
    [
        {
            code: 'TEXT.SEVERAL_H1',
        }
    ],
    [
        {
            code: 'TEXT.SEVERAL_H1',
        },
        {
            code: 'TEXT.SEVERAL_H1',
        },
    ]
];


const h2 = [
    `[
        {
            "block": "text",
            "mods": { "type": "h1" }
        },
        {
            "block": "text",
            "mods": { "type": "h2" }
        }
    ]`,
    `[
        {
            "block": "text",
            "mods": { "type": "h2" }
        },
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
    ]`,
    `[
        {
            "block": "page",
            "content": {
                "block": "text",
                "mods": { "type": "h1" }
            }
        },
        {
            "block": "text",
            "mods": { "type": "h2" }
        },
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
    ]`
];


const h2Results = [
    [
    ],
    [
        {
            code: 'TEXT.INVALID_H2_POSITION',
        }
    ],
    [
        {
            code: 'TEXT.SEVERAL_H1',
        }
    ]
];


const h3 = [
    `[
        {
            "block": "text",
            "mods": { "type": "h1" }
        },
        {
            "block": "text",
            "mods": { "type": "h2" }
        },
        {
            "block": "text",
            "mods": { "type": "h3" }
        },
        {
            "block": "text",
            "mods": { "type": "h3" }
        }
    ]`,
    `[
        {
            "block": "text",
            "mods": { "type": "h3" }
        },
        {
            "block": "text",
            "mods": { "type": "h2" }
        }
    ]`,
    `[
        {
            "block": "page",
            "content": {
                "block": "text",
                "mods": { "type": "h3" }
            }
        },
        {
            "block": "text",
            "mods": { "type": "h2" }
        },
        {
            "block": "text",
            "mods": { "type": "h1" }
        },
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
    ]`
];


const h3Results = [
    [
    ],
    [
        {
            code: 'TEXT.INVALID_H3_POSITION',
        },
        {
            code: 'TEXT.INVALID_H2_POSITION',
        }
    ],
    [
        {
            code: 'TEXT.INVALID_H3_POSITION',
        },
        {
            code: 'TEXT.INVALID_H2_POSITION',
        },
        {
            code: 'TEXT.SEVERAL_H1',
        }
    ]
];


const grid = [
    `{
        "block": "grid",
        "mods": {
            "m-columns": "10"
        },
        "content": [
            {
                "block": "grid",
                "elem": "fraction",
                "elemMods": {
                    "m-col": "8"
                },
                "content": [
                    {
                        "block": "payment"
                    }
                ]
            },
            {
                "block": "grid",
                "elem": "fraction",
                "elemMods": {
                    "m-col": "2"
                },
                "content": [
                    {
                        "block": "offer"
                    }
                ]
            }
        ]
    }`,
    `{
        "block": "grid",
        "mods": {
            "m-columns": "10"
        },
        "content": [
            {
                "block": "grid",
                "elem": "fraction",
                "elemMods": {
                    "m-col": "2"
                },
                "content": [
                    {
                        "block": "payment"
                    }
                ]
            },
            {
                "block": "grid",
                "elem": "fraction",
                "elemMods": {
                    "m-col": "8"
                },
                "content": [
                    {
                        "block": "offer"
                    }
                ]
            }
        ]
    }`,
    `{
        "block": "grid",
        "mods": {
            "m-columns": "10"
        },
        "content": [
            {
                "block": "grid",
                "elem": "fraction",
                "elemMods": {
                    "m-col": "5"
                },
                "content": [
                    {
                        "block": "payment"
                    }
                ]
            },
            {
                "block": "grid",
                "elem": "fraction",
                "elemMods": {
                    "m-col": "5"
                },
                "content": [
                    {
                        "block": "offer"
                    }
                ]
            }
        ]
    }`
];


const gridResults = [
    [],
    [{code: "GRID.TOO_MUCH_MARKETING_BLOCKS"}],
    []
];

const positionOfErrors = [
    `{
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
            { "block": "text", "mods": { "size": "xl" } },
            { 
              "block": "page",
              "content":  
                [
                    { 
                        "block": "button", 
                        "mods": { "size": "xl" } 
                    }
                ]
            }
        ]
    }`
];

const positionOfErrorsResults = [
    [
        {
            location: { start: { column: 1, line: 1 }, end: { column: 6, line: 22 } }
        }
    ],
    [
        {
            location: { start: { column: 21, line: 9 }, end: { column: 22, line: 12 } }
        },
        {
            location: { start: { column: 21, line: 9 }, end: { column: 22, line: 12 } }
        }
    ]
];