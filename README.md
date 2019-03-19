## Waves Client API's proxy


### Installation

```
npm i
```


### Start

```
node server.js
```
Open up Chrome and go to https://localhost:4000

and accept dev certificate for this session 

otherwise Chrome will block all requests to proxy in Client


### Seting up

Set up clients `meta.json` configuration

```
"node": "https://localhost:4000",
"matcher": "https://localhost:4001/matcher",
"api": "https://localhost:4002",
```


#### Disabling some API points

Edit `server.js` to disable some API endpoints

Uses RegEx
```
    pathRewrite: {
        '^/some/path': '' //Disable path
    },
```


##### Example:

This will disable all request with word "balance" and "alias" in endpint
```
    pathRewrite: {
        'balance': '',
        'alias': ''
    },
```