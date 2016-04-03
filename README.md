# react-style-px-suffix-codemod

[![Circle CI](https://circleci.com/gh/conorhastings/react-style-px-suffix-codemod.svg?style=svg)](https://circleci.com/gh/conorhastings/react-style-px-suffix-codemod)

Starting with React 15, React will warn that unitless values will no longer bw appended with `px` and the appending will be removed in future versions of react,this is a codemod that finds unitless specifications in your code and appends with `px`.

## use

* `npm install jscodeshift -g`
* `npm install react-style-px-suffix-codemod`
* run this script with `jscodeshift -t node_modules/react-style-px-suffix-codemod <DIRECTORY_OR_FILE_TO_RUN_ON>`

## options

It is also possible to pass a `--ignore` flag when running to specify properties that you do not want to have px appended, example below. The properties should be comma delimited

`jscodeshift -t <THIS_SCRIPT> <DIRECTORY_OR_FILE_TO_RUN_ON> --ignore=fontSize,hats`
