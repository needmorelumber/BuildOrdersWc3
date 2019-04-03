import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import {
  Paper,
  Grid,
  Button,
  MenuItem,
} from '@material-ui/core';

import { PATCHES, RACES } from '../../constants';

const raceDropdownItems = RACES.map(race => (
  <MenuItem
    key={race.code}
    value={race.code}
  >
    {race.label}
  </MenuItem>
));

// eslint-disable-next-line react/prop-types
const formRender = ({ handleSubmit, submitting, values }) => (
  <form onSubmit={handleSubmit} noValidate>
    <Paper style={{ padding: 16 }}>
      <Grid container alignItems="flex-start" spacing={8}>
        <Grid item xs={12}>
          <Field
            fullWidth
            required
            name="name"
            component={TextField}
            type="text"
            label="Build Name"
          />
        </Grid>
        <Grid item xs={4}>
          <Field
            fullWidth
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
            name="opposing_race"
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
            name="description"
            component={TextField}
            type="textarea"
            label="Description & Analysis"
          />
        </Grid>
        <Grid item style={{ marginTop: 16 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={submitting}
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
    initialValues={initialValues}
    validate={validate}
    render={formRender}
  />
);

CreateUpdateBuildForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  validate: PropTypes.func.isRequired,
};


export default CreateUpdateBuildForm;
