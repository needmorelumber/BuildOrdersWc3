export const required = value => (value ? undefined : 'Required');

export const maxLength = length => value => (value.length > length ? `Can't be greater than ${length} characters` : undefined);

export const composeValidators = (...validators) => value => validators
  .reduce((error, validator) => error || validator(value), undefined);
