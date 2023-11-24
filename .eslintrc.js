export default {
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "extends": ["@mate-academy/eslint-config-react-typescript", "plugin:cypress/recommended"],
  "plugins": ["import"],
  "rules": {
    "max-len": ["error", {
      "ignoreTemplateLiterals": true,
      "ignoreComments": true
    }],
    "jsx-a11y/label-has-associated-control": ["error", {
      "assert": "either"
    }],
    "import/order": ["error", {"alphabetize": {"order": "asc"}}]
  }
}

