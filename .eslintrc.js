module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: [
    'import',
    'jsx-a11y',
    'react',
    'mocha',
  ],
  settings: {
    react: {
      version: 'detect',
    }
  },
  rules: {
    'import/prefer-default-export': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-unused-expressions': 'off',
    'object-curly-newline': ['error', { consistent: true }],
    'jsx-a11y/label-has-for': [2, {
      components: ['Label'],
      required: {
        every: ['id'],
      },
      allowChildren: false,
    }],
    "jsx-a11y/label-has-associated-control": [2, {
      "controlComponents": ["Field"],
    }],
    'jsx-a11y/no-autofocus': [1, {
      ignoreNonDOM: true,
    }],
    'mocha/no-exclusive-tests': 'error',
    'react/forbid-prop-types': 'off',
    'react/jsx-curly-brace-presence': [2, { children: 'ignore' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/require-default-props': 'off',
    'react/no-unsafe': [2, { checkAliases: true }],
    'react/destructuring-assignment': 'off',
    'no-underscore-dangle': 'off',
  },
};
