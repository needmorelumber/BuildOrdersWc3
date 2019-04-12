# Get latest node
# TODO: see if we can get alpine working with node-sass
FROM node:10

ARG NODE=development
ENV NODE_ENV ${NODE}

USER node
COPY --chown=node / /usr/src/app/
WORKDIR /usr/src/app/
RUN yarn && yarn cache clean
CMD ["node", "server.js"]
