# Certbot API

Simple expressjs API to interact with Certbot.

You can create new certificates with Certbot with a simple POST request:

http://localhost/new-cert

POST parameter: **domain**. You **NEED TO VALIDATE** what you send, there is no validation in this application.

Certbot is preconfigured to non-interactive mode and uses the HTTP ACME validation.

## Installation
1) Checkout this repository :)
2) sudo apt install npm
3) `npm install`
4) Configure `.env`
4) `node server.js`

## Configuration
You need to set the `WEBROOT` parameter to your webserver's root directory (where .well-known takes place). This should 
be accessible from the newly created domains.