# WmsViewer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Build and publish docker image

To build docker image use 

`docker build -t shookas/wms-viewer:<version> -t shookas/wms-viewer:latest .`

To publish image

`docker push shookas/wms-viewer:<version>`

## Run docker image 

Run from docker imgae 

`docker run -d -p <port>:80 shookas/wms-viewer:latest`

Run docker imgages from docker-compose.yml file

`docker-compose up -d`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
