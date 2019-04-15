# ClouderaGithubSearch

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

To try a working demo of the project visit [https://herczeg6179.github.io/cloudera-github-search/](https://herczeg6179.github.io/cloudera-github-search/)

## Requirements

**nodejs** use [nvm](https://github.com/creationix/nvm) to install the correct nodejs version. navigate to the root folder of the project and run the following command (it automatically installs and activates the correct ndoejs version)
```bash
$ nvm install
```
*note:* nvm does not work so well on windows. it's still fine for managing installation, but doesn't work with a `.nvmrc` file. run
```
> nvm install {look up version in the .nvmrc file}
> nvm use {same version}
```  

## Development

- Run `npm install` before first use.
- Run `npm run start` to start the local development server.
- Run `npm run build` to create the production artifacts.
    - note: they will be placed in the `dist` folder
- Run `npm run format:changed` to have prettier format all the changed files
- Run `npm run test:watch` to run the tests, and then keeps re-running them on changes in the code

### Other Commands

- `npm run format:staged` prettier formats the staged files. runs pre-commit 
- `npm run lint` lints the code, runs pre-commit 
- `npm run test` runs the tests once. runs pre-push
- `npm run ng -- {options}` for running ng-cli commands with the local installation
- `npm run prettier -- {options}` for running prettier commands with the local installation  

## Code scaffolding

Run `npm run ng generate component path/to/component-name (-- --module="module-name")` to generate a new component. You can also use `npm run ng generate directive|pipe|service|class|guard|interface|enum|module`.
