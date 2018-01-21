module.exports = {
    "extends": [
        "google",
        "plugin:react/recommended"
    ],
    "plugins": [
        "react"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "modules": true
    },
    "ecmaFeatures": {
        "jsx":true
    },
    "rules": {
        "require-jsdoc": 0,
        "linebreak-style": 0,
        "semi": [2, "never"],
        "max-len": [2, 120]
    }
};