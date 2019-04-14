# WmsViewer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Build and publish docker image

To build docker image with version from package.json use 

`npm run docker:build`

To publish image

`docker push shookas/wms-viewer:$(node -p "require(\"./package.json\").version")`

## Run docker image 

Run from docker imgae 

`docker run -d -p <port>:80 shookas/wms-viewer:latest`

Run docker imgages from docker-compose.yml file

`docker-compose up -d`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Local development

### Start backend geoserver
1) Use `kartoza/geoserver` for backend geoserver contenerization and point to locally created `~/geoserver_data` 

    folder
`sudo docker run -d -p 8080:8080 -v $HOME/geoserver_data:/opt/geoserver/data_dir kartoza/geoserver`

    No database needed because all backend state will be written in `~/geoserver_data` folder
  
2) Enable authentication via headers in Geoservser
    - Security > Authentication
  
      Add Authentication Filter `Authenticate From Headers` and leave deafulat settings
    
    - Add this filter into authentication filter chains to rest services and move it to the first place

3) Allow to use rest GET calls for ADMIN role

    - edit `%HOME/geoserver_data/security/services.properties` file
    
      `rest:GET=ADMIN`

### Start frontend
`ng serve`

Proxy is defined in dev server configuration `proxy.conf.json`
