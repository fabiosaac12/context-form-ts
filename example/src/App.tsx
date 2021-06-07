import React from 'react';
import {
  withForm,
  Field,
  useForm,
  min,
  max,
  numeric,
  compose,
} from 'context-form-ts';
import { FieldChildren } from '../../dist/models/Field';

const inputs = [
  {
    name: 'name',
    placeholder: 'Name',
    validate: min(2, '2 characters minimum'),
  },
  {
    name: 'lastName',
    placeholder: 'Last Name',
    validate: max(20, '20 characters maximum'),
  },
  {
    name: 'country',
    placeholder: 'Country',
    validate: min(5, '5 characters minimum'),
  },
  {
    name: 'age',
    placeholder: 'Age',
    validate: compose(
      numeric('Must be a number'),
      min(0, '0 minimum'),
      max(20, '20 maximum'),
    ),
    type: 'number',
  },
];

const renderInput: FieldChildren = ({ input, info, ...props }) => (
  <div className="inputContainer">
    <input {...input} className="input" {...props} />
    {!!info.error && info.hasBeenTouched && (
      <div className="error">{info.error}</div>
    )}
  </div>
);

const App = withForm(() => {
  const form = useForm();

  return (
    <>
      {inputs.map((input) => (
        <Field {...input}>{renderInput}</Field>
      ))}
      <button onClick={form.handleSubmit(console.log)}>Submit</button>
    </>
  );
});

export default App;
