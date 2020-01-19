module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 4],
        "quotes": "off",
        "guard-for-in": "off",
        "no-param-reassign": "off",
        "no-restricted-syntax": "off",
        "no-plusplus": "off",
        "no-unused-vars": "off",
        "no-undef": "off",
        "linebreak-style": "off"
    }
};