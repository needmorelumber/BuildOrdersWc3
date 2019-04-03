[![CircleCI](https://circleci.com/gh/needmorelumber/BuildOrdersWc3/tree/master.svg?style=svg)](https://circleci.com/gh/needmorelumber/BuildOrdersWc3/tree/master) [![Greenkeeper badge](https://badges.greenkeeper.io/needmorelumber/BuildOrdersWc3.svg)](https://greenkeeper.io/)
## Hey this is www.needMoreLumber.com

It's a place to create and share build orders for warcraft 3, and use those builds to help you in game.

## Contributing
Feel free to open issues or pull requests. See below for how to get this running locally.

## Getting Started

### Install Docker
[Installation instructions can be found here.](https://docs.docker.com/engine/installation/)

### Install Docker Compose
Mac and Windows' docker installation comes with docker-compose preinstalled. For linux
Follow the [instructions here](https://docs.docker.com/compose/install/#install-compose).

Make sure to follow the [post-install instructions](https://docs.docker.com/install/linux/linux-postinstall/), too.

### Booting up your local

Check that your docker and docker-compose are actually installed!

```
$ docker-compose -v
docker-compose version 1.17.0, build ac53b73

$ docker -v
Docker version 18.09.3, build 774a1f4

```
You should get output that looks like the above. The versions may differ but this shows
you at least have the right things installed.


Now for the magic. From root, run

```
docker-compose up
```

after this has completed you should be able to visit http://localhost:3000/ and your local is set up.
