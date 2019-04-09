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
import { withHotKeys } from 'react-hotkeys';

import { TextFieldInput } from '../../../common/components/react-final-form-material-ui-fields';
import { PATCHES, RACES } from '../../constants';

const keyMap = {
  ADD_ROW: { sequence: 'tab', action: 'keyup' },
  MOVE_ROW_UP: 'up',
  MOVE_ROW_DOWN: 'down',
};

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
            component={TextFieldInput}
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
            Use your keyboard <strong>Up</strong> and <strong>Down</strong> to reorder.
          </Typography>
        </Grid>
        <FieldArray name="buildSteps">
          {({ fields }) => fields.map((buildStep, index) => {
            const handlers = {
              ADD_ROW: () => {
                console.log('TAB!');
                if (index === fields.length - 1) {
                  fields.push(null);
                }
              },
              MOVE_ROW_UP: () => {
                console.log('UP!');
                try {
                  // Up key pressed
                  fields.move(index, index - 1);
                } catch (error) {
                  // do nothing.
                }
              },
              MOVE_ROW_DOWN: () => {
                console.log('DOWN!');
                try {
                  // Down key pressed
                  fields.move(index, index + 1);
                } catch (error) {
                  // do nothing;
                }
              },
            };
            return (
              <Fragment key={buildStep}>
                <Grid item xs={1}>
                  <Field
                    fullWidth
                    name={`${buildStep}.food`}
                    component={withHotKeys(TextFieldInput, { keyMap, handlers })}
                    type="text"
                    label="Food"
                  />
                </Grid>
                <Grid item xs={1}>
                  <Field
                    fullWidth
                    name={`${buildStep}.totalFood`}
                    component={withHotKeys(TextFieldInput, { keyMap, handlers })}
                    type="text"
                    label="Total"
                  />
                </Grid>
                <Grid item xs={10}>
                  <Field
                    fullWidth
                    multiline
                    name={`${buildStep}.description`}
                    component={withHotKeys(TextFieldInput, { keyMap, handlers })}
                    type="textarea"
                    label="Notes"
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
  validate: PropTypes.func.isRequired,
};


export default CreateUpdateBuildForm;
