const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');

const app = feathers();

// Connect to the same as the browser URL (only in the browser)
const restClient = rest();

// eslint-disable-next-line no-undef
if (window && window.fetch) {
  // eslint-disable-next-line no-undef
  app.configure(restClient.fetch(window.fetch));
}

export default app;
