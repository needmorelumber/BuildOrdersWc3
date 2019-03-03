
# Get latest node, make a working directory.
FROM node:8
RUN mkdir -p /usr/src/app
COPY . /usr/src/app

# change our working directory to the one we just built.
WORKDIR /usr/src/app
RUN npm install

# Stupid we need to do this but there's some issue with bcrypt
RUN npm rebuild bcrypt --update-binary

# Expose 3000 for access to our node server
EXPOSE 3000
