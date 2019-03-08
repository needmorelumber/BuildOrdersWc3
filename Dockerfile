# Get latest node
FROM node:8

# install dependencies first, in a different location for easier app bind mounting for local development.
# Note: that means if you try to put it in /app, it will fail...
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir -p /opt/node_app/app && chown -R node:node /opt/node_app
WORKDIR /opt/node_app

# the official node image provides an unprivileged user as a security best practice
# but we have to manually enable it. We put it here so npm installs dependencies as the same
# user who runs the app.
USER node

# Copy package over and install it
COPY package.json package-lock.json* ./
RUN yarn
ENV PATH /opt/node_app/node_modules/.bin:$PATH

# copy in our source code
WORKDIR /opt/node_app/app
COPY . .

# Expose 3000 for access to our node server
EXPOSE 3000
