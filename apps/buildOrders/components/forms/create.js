import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  MenuItem,
} from '@material-ui/core';

const validate = () => {
  1 + 1;
  return {};
};

const initialValues = {

};

const raceDropdownItems = [
  (<MenuItem key="HU" value="HU">Human</MenuItem>),
  (<MenuItem key="NE" value="NE">Night Elf</MenuItem>),
  (<MenuItem key="OR" value="OR">Orc</MenuItem>),
  (<MenuItem key="UD" value="UD">Undead</MenuItem>),
];

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
            <MenuItem key="" value="1.30.4">1.30.4</MenuItem>
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

const CreateBuildForm = ({ onSubmit }) => (
  <div style={{ padding: 16, margin: 'auto', maxWidth: 900 }}>
    <CssBaseline />
    <Typography variant="h5" align="center" component="h2" gutterBottom>
      Create Build
    </Typography>
    <Typography paragraph>
      I stole <Link href="https://codesandbox.io/s/9ywq085k9w">this code.</Link>
    </Typography>
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={formRender}
    />
  </div>
);

CreateBuildForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


export default CreateBuildForm;
