# react-style-px-codemod

Starting with React 15, React will warn that unitless values will no longer bw appended with `px` and the appending will be removed in future versions of react,this is a codemod that finds unitless specifications in your code and appends with `px`.

## use

* `npm install jscodeshift -g`
* run this script with `jscodeshift -t <THIS_SCRIPT> <DIRECTORY_OR_FILE_TO_RUN_ON>`

## options

It is also possible to pass a `--ignore` flag when running to specify properties that you do not want to have px appended, example below.

`jscodeshift -t <THIS_SCRIPT> <DIRECTORY_OR_FILE_TO_RUN_ON> --ignore=fontSize,hats`
