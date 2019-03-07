# Get latest node
FROM node:8

# npm install package.json FRESH from a temporary directory
# to avoid shared volume's node_module's interfering
COPY package.json /tmp/package.json
RUN cd /tmp && npm install

# Make a working directory.
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app
COPY . /usr/src/app

# change our working directory to the one we just built.
WORKDIR /usr/src/app

# Expose 3000 for access to our node server
EXPOSE 3000
