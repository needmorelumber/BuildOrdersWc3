## Hey this is www.needMoreLumber.com

## It's a place to create build orders for warcraft 3, and use those builds to help you in game!!

## Not live yet. Check it out locally by cloning, and running npm install. Must have mongodb running. Next create a config file in /server/config called 'config.js'. Make that look like this... 
```
module.exports =  (() => {
  const config = {
    dbURI: `Your mongoose connection string`,
    sessionSecret: 'a secret for your sessions'
  }
  return config;
})();
```

## Feel free to get in touch
