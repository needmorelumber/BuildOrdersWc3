export const decorateComponent = (component, decorators = []) => (
  decorators.reduce((previousComponent, decorator) => decorator(previousComponent), component));
