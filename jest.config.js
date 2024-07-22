module.exports = {
    roots: ['<rootDir>/src'], //root where the testing files and modules are present, inside src folder
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // how to transform files before testing them, convert all the js and jsx to Babel(latest JS features)
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$', //This is a regular expression that specifies the naming convention for test files, matches files inside any __tests__ directory or files with a .test.js, .test.jsx, .spec.js, or .spec.jsx extension.
    moduleFileExtensions: ['js', 'jsx'], //This specifies the file extensions that Jest will recognize as modules.
  };
  