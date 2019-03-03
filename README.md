## Hey this is www.needMoreLumber.com

It's a place to create and share build orders for warcraft 3, and use those builds to help you in game.

## Contributing
Feel free to open issues or pull requests. See below for how to get this running locally.

## Getting Started

### Dependencies
You need Node and npm. Let's make sure you have the latest versions.
To install the latest LTS release, use this ppa:

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
```

then install npm and node via:

```bash
sudo apt install nodejs
```

You will also need MongoDB installed. See https://docs.mongodb.com/manual/installation/#tutorial-installation
and follow the instructions for your OS.

If your installation has gone successfully, you should be able to start the service using

```bash
sudo service mongod start
```

### Booting up your local

First go to `./server/config/config.js-replace-me` and follow the instructions there to
build your .gitignore'd config.js file.

Next run `npm install` in the root directory to build your node_modules. If that succeeds,
run from root directory:

```bash
npm start
```

Now going to http://localhost:4200 should bring you to your own local needmorelumber.com

### edit your hosts file (Optional)
If on mac or ubuntu, edit `/etc/hosts` and add the line:
```
127.0.0.1:3000 dev.needmorelumber.com
```

so that you can visit your local site at dev.needmorelumber.com
