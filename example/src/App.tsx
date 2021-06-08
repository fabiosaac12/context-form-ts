import React from 'react';
import {
  withForm,
  Field,
  useForm,
  min,
  max,
  numeric,
  compose,
  SubmitFunction,
} from 'context-form-ts';

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

interface Values {
  name: string;
  lastName: string;
  country: string;
  age: number;
}

const App = withForm(() => {
  const form = useForm();

  const onSubmit: SubmitFunction = (values: Values) =>
    alert(JSON.stringify(values, null, 4));

  return (
    <>
      {inputs.map((input) => (
        <Field key={input.name} {...input}>
          {({ input, info, ...props }) => (
            <div className="inputContainer">
              <input {...input} className="input" {...props} />
              {!!info.error && info.hasBeenTouched && (
                <div className="error">{info.error}</div>
              )}
            </div>
          )}
        </Field>
      ))}
      <button onClick={form.handleSubmit(onSubmit)}>Submit</button>
    </>
  );
});

export default App;
