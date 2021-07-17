# Polyhymnia Private Portal (Chromium Version)

This project was bootstrapped with Create React App.

## Main Info

The Polyhymnia Private Portal (PPP) is a CRM for easy comunication between the choir administaration and artists. PPP allows to publish ads, files and other data for registered users and access them in a simple way.

## Release Info

This version of PPP presents the files of the client and server side of the application without some secret files. For  the application to work correctly, you must create `./server/data-store`, `./server/data-store/images`, `./server/data-store/images/avatars`, `./server/data-store/images/scores` and provide existence default files like `avatar.png` and `cover.png`. You should also create a ./secret/secret.js file and add the following information to it.

`const dbUrl =  "DataBaseUrl";
const dbName = 'polyhymnia';
const dbCollections = {
	users: 'collectionName',
	sessions: 'collectionName',
	scores: 'collectionName',
	adds: 'collectionName',
}

const cookieSecretKey = 'cookieSecretKeyName'

module.exports.secret_dbUrl = dbUrl;
module.exports.secret_dbName = dbName;
module.exports.secret_dbCollections = dbCollections;
module.exports.secret_cookieSecretKey = cookieSecretKey;`

This version is guaranteed to work correctly only on the Google-Chrome-Desctop ant the Google-Chrome-Mobile. It has not been tested in other browsers.

This version is not speed optimized too.

## Available Scripts

`ALL DEFAULT CRA SCRIPTS`

`node ./server/app.js`

This command starts server side of the app and uses localhost:3000. by default.
Use it or change the directory to ./server and run

`npm start`

## API Documentation

The client uses the PPP API to access users, scores, and other data.
If you need PPP API Documentation, please clone ./doc directory and open ./dist/index.html
