cmd /k for %%v in (*.js) do start cmd /k watchify "%%v" -o "compiled/%%v"