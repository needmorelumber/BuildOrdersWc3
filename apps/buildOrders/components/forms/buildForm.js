import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { Select } from 'final-form-material-ui';
import {
  Paper,
  Grid,
  Button,
  MenuItem,
  Typography,
  Divider,
} from '@material-ui/core';

import { TextFieldInput } from '../../../common/components/react-final-form-material-ui-fields';
import { PATCHES, RACES } from '../../constants';
import {
  required,
  maxLength,
  composeValidators,
} from '../../../common/final-form/validators';

const raceDropdownItems = RACES.map(race => (
  <MenuItem
    key={race.code}
    value={race.code}
  >
    {race.label}
  </MenuItem>
));

const fieldArrayRefs = {};

// eslint-disable-next-line react/prop-types
const formRender = ({ handleSubmit, submitting, values, form, pristine, invalid }) => (
  <form onSubmit={handleSubmit}>
    <Paper style={{ padding: 16 }}>
      <Grid container alignItems="flex-start" spacing={8}>
        <Grid item xs={12}>
          <Field
            fullWidth
            validate={composeValidators(required, maxLength(500))}
            required
            name="name"
            component={TextFieldInput}
            type="text"
            label="Build Name"
          />
        </Grid>
        <Grid item xs={4}>
          <Field
            fullWidth
            validate={required}
            required
            name="race"
            component={Select}
            label="Race"
            formControlProps={{ fullWidth: true }}
          >
            {raceDropdownItems}
          </Field>
        </Grid>
        <Grid item xs={4}>
          <Field
            fullWidth
            required
            validate={required}
            name="opposingRace"
            component={Select}
            label="Opposing Race"
            formControlProps={{ fullWidth: true }}
          >
            <MenuItem key="--" value="--">--</MenuItem>
            {raceDropdownItems}
          </Field>
        </Grid>
        <Grid item xs={4}>
          <Field
            fullWidth
            required
            validate={required}
            name="patch"
            component={Select}
            label="Patch"
            formControlProps={{ fullWidth: true }}
          >
            {PATCHES.map(patch => (<MenuItem key={patch} value={patch}>{patch}</MenuItem>))}
          </Field>
        </Grid>
        <Grid item xs={12}>
          <Field
            fullWidth
            multiline
            validate={composeValidators(required, maxLength(1000))}
            name="description"
            component={TextFieldInput}
            type="textarea"
            label="Description & Analysis"
          />
        </Grid>
        <Divider />
        <Grid item xs={12} style={{ marginTop: 16 }}>
          <Typography variant="h5" align="left" component="h5" gutterBottom>
            Build Steps
          </Typography>
          <Typography paragraph>
            Hit <strong>Tab</strong> to make a new step.
            Hit <strong>Backspace</strong> to go back or delete steps.
          </Typography>
        </Grid>
        <FieldArray name="buildSteps">
          {({ fields }) => fields.map((buildStepName, index) => {
            const buildStep = fields.value[index];

            // We're keeping an index to reference each input field.
            fieldArrayRefs[index] = { ...fieldArrayRefs[index] };

            const onTabMakeNewRow = e => {
              if (index === fields.length - 1
                && e.keyCode === 9) {
                // Tab was pushed, make a new row.
                fields.push(null);
                // prevent default to prevent submit button from being focused
                e.preventDefault();
              }
            };

            const onBackSpaceDeleteStep = e => {
              if (e.keyCode === 8
                && index > 0
                && (!buildStep || !buildStep.food)) {
                try {
                  // backspace key pressed:
                  // Remove this field
                  fields.remove(index);
                  // Focus the description from the previous row
                  setTimeout(() => fieldArrayRefs[index - 1].description.focus(), 100);
                } catch (error) {
                  // do nothing
                }
              }
            };

            const onBackSpaceFocusPrecedingRow = (buildStepProp, toFocusProp) => e => {
              if (e.keyCode === 8
                && buildStep
                && !buildStep[buildStepProp]) {
                try {
                  // backspace key pressed:
                  // Focus the the preceding field
                  setTimeout(() => fieldArrayRefs[index][toFocusProp].focus(), 100);
                } catch (error) {
                  // do nothing
                }
              }
            };

            return (
              <Fragment key={buildStepName}>
                <Grid item xs={1}>
                  <Field
                    fullWidth
                    validate={composeValidators(required, maxLength(6))}
                    autoFocus={index > 0 && index === fields.length - 1}
                    name={`${buildStepName}.food`}
                    component={TextFieldInput}
                    type="text"
                    label="Food"
                    inputRef={input => { fieldArrayRefs[index].food = input; }}
                    extraInput={{
                      onKeyDown: onBackSpaceDeleteStep,
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Field
                    fullWidth
                    validate={composeValidators(required, maxLength(6))}
                    name={`${buildStepName}.totalFood`}
                    component={TextFieldInput}
                    type="text"
                    label="Total"
                    inputRef={input => { fieldArrayRefs[index].totalFood = input; }}
                    extraInput={{
                      onKeyDown: onBackSpaceFocusPrecedingRow('totalFood', 'food'),
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Field
                    fullWidth
                    multiline
                    validate={composeValidators(required, maxLength(500))}
                    name={`${buildStepName}.description`}
                    component={TextFieldInput}
                    type="textarea"
                    label="Notes"
                    inputRef={input => { fieldArrayRefs[index].description = input; }}
                    extraInput={{
                      onKeyDown: e => {
                        onTabMakeNewRow(e);
                        onBackSpaceFocusPrecedingRow('description', 'totalFood')(e);
                      },
                    }}
                  />
                </Grid>
              </Fragment>
            );
          })}
        </FieldArray>
        <Grid item style={{ marginTop: 16 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={submitting || pristine || invalid}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
    <pre>Here is the form data:

      {JSON.stringify(values, 0, 2)}
    </pre>
  </form>
);

const CreateUpdateBuildForm = ({ onSubmit, initialValues = {}, validate }) => (
  <Form
    onSubmit={onSubmit}
    initialValues={{ buildSteps: [null], ...initialValues }}
    validate={validate}
    render={formRender}
    mutators={{
      ...arrayMutators,
    }}
  />
);

CreateUpdateBuildForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  validate: PropTypes.func,
};


export default CreateUpdateBuildForm;
