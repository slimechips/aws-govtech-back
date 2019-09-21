# f10-hack

## Useful Resources

* Node Best Practices: https://devcenter.heroku.com/articles/node-best-practices
* Using Node/Express with Typscript: https://medium.com/javascript-in-plain-english/typescript-with-node-and-express-js-why-when-and-how-eb6bc73edd5d


## FIRST OFF

Download Windows Subsystem for Linux, and download ubuntu as well. Or use Ubuntu if you have it.



Run the `FirstRun.sh` shell script. This will

* Install Make
* Install node/npm
* Install Angular
* Install Forever(?)

```bash
sudo bash FirstRun.sh
```

## Building the angular app

First make sure you have Angular CLI installed.

```bash

```

## Initialise a Node/Typscript/Express/eslint/nodemon/debugger microservice

Simply copy the `sample-service` from `bootstrap` into root directory, rename it and edit the name and description in `<new-service>/package.json`

/usr/local/lib/nodejs/node-v10.16.0-linux-x64/lib/node_modules/forever/bin/forever start --minUptime 5000 --spinSleepTime 2000 -c "node --require ts-node/register" app.ts