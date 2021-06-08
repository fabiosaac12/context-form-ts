# **context-form-ts**

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/context-form-ts.svg)](https://www.npmjs.com/package/context-form-ts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<br/>

# **Install**

```bash
npm install context-form-ts
```

or...

```bash
yarn add context-form-ts
```

<br/>

# **Usage**

```jsx
import { withForm, useForm, Field, email, min } from 'context-form-ts';

const Form = withForm(() => {
  const form = useForm();

  const onSubmit = (values) => {
    console.log(values);
    alert(values);
  };

  return (
    <>
      <Field
        name="email"
        placeholder="E-mail"
        type="email"
        className="input"
        validate={email('Must be an email')}
      >
        {({ input, info, ...props }) => (
          <div className="inputContainer">
            <input {...input} {...props} />
            {!!info.error && info.hasBeenTouched && (
              <div className="error">{info.error}</div>
            )}
          </div>
        )}
      </Field>
      <Field
        name="password"
        placeholder="Password"
        type="password"
        className="input"
        validate={min(7, 'Must have 7 characters minimum')}
      >
        >
        {({ input, info, ...props }) => (
          <div className="inputContainer">
            <input {...input} {...props} />
            {!!info.error && info.hasBeenTouched && (
              <div className="error">{info.error}</div>
            )}
          </div>
        )}
      </Field>
      <button onClick={form.handleSubmit(console.log)}>Submit</button>
    </>
  );
});
```

<br/>

# **API**

## **withForm (hoc)**

Embeds your component inside the neccesary context to work.

### **Usage**

```jsx
const Form = withForm(() => {
  ...
  return (
    <>
      {...}
    </>
  );
});

```

<br/>

## **useForm (hook)**

A hook that returns the form context value.

```js
const form = useForm();
```

### **Context Value**

#### **values**

Immutable object with the form values.

```js
console.log(form.values);
```

#### **setValues**

Function that receive an object with new form values which will overwrite the past values.

```js
form.setValues({ ...newValues });
```

#### **setValue**

function that sets the value of a key of the form values ​​object.

```js
form.setValue('email', 'fabiosaac12@gmail.com');
```

#### **errors**

Immutable object with the form value errors.

```js
console.log(form.errors);
```

#### **setErrors**

Function that receive an object with new form value errors which will overwrite the past errors.

```js
form.setErrors({ ...newErrors });
```

#### **setError**

function that sets the value of a key of the form errors ​​object.

```js
form.setError('email', 'Must be a registered e-mail.');
```

#### **defaultValues**

Immutable object with the form defaultValues.

```js
console.log(form.defaultValues);
```

#### **setDefaultValues**

Function that receive an object with new form default values which will overwrite the past default values.

```js
form.setDefaultValues({ ...newDefaultValues });
```

#### **setDefaultValue**

function that sets the value of a key of the form default values ​​object.

```js
form.setDefaultValue('email', 'fabiosaac12@gmail.com');
```

### **cleanForm**

function that sets the form values as a new empty object.

```js
form.cleanForm();
```

### **resetForm**

function that returns the form values object to its initial value (with the default values)

```js
form.cleanForm();
```

### **handleSubmit**

Function that receives a submit function as param and returns the received function bound with new functionality for the form, such as the corresponding verification of the form values before calling the submit function.

```jsx
const onSubmit = (values) => {
  console.log(values);
  alert(values);
};

return (
  <>
    {...}
    <button onClick={form.handleSubmit(onSubmit)}>
      Submit
    </button>
    {...}
  </>
);
```

<br/>

## **Field (React Component)**

A component that receives as children a function which will be have as params all the necessary data for the field.

### **Props**

|     prop     |         type          | description                                                                 |
| :----------: | :-------------------: | :-------------------------------------------------------------------------- |
|     name     |        string         | the input name which will be the key of the input in the form values object |
| defaultValue |  string \| undefined  | default value of the input                                                  |
|   children   |       function        | Info below....                                                              |
|   validate   | function \| undefined | Info below...                                                               |

### **children**

### A function that will render the input with some data that it will receive as param

**Param that will be sent to the children function**

```js
param {
  name: string,
  input: {
    onChange: input onBlur event handler function,
    onBlur: input onBlur event handler function,
    value: any,
  },
  info: {
    hasBeenTouched: boolean,
    hasChanged: boolean,
    error: string | true | undefiend,
  },
  {...allTheOtherPropsThatYouPassedToTheFieldComponent}
}
```
**Example**
```jsx
<Field name="email" validate={email('Must be an email')}>
  ({name, input, info, ...props}) => {
    <input
      name={name} // unnecesary
      {...props}
      {...info}/>
    {!!info.error && info.hasBeenTouched && (
      <p>{info.error}</p>
    )}
  }
</Field>
```

### **validate**

Function that receives the input value as param and returns true or string if there is any error.

```jsx
  const validate = (value) => {
    if (!(value === 'correct value')) return 'Incorrect value';
  };

  return (
    {...}
      <Field {...props} validate={validate} />
    {...}
  );
```

This library has various validate function generators that you can use. See below.

### **Validate function generators by the library**

```js
import {
  required,
  min,
  max,
  email,
  alphanumeric,
  alpha,
  numeric,
  lowercase,
  uppercase,
} from 'context-form-ts';
```

### `required`

```jsx
<Field
  name="name"
  type="text"
  validate={required()}>
  {...}
</Field>
```

### `min`

```jsx
<Field
  name="age"
  type="number"
  validate={min(0, 'You must born first')}>
  {...}
</Field>
<Field
  name="name"
  type="text"
  validate={min(4, 'Must have 4 characters minimum')}>
  {...}
</Field>
```

### `max`

```jsx
<Field
  name="age"
  type="number"
  validate={max(150, 'You must be alive')}>
  {...}
</Field>
<Field
  name="name"
  type="text"
  validate={max(19, 'Must have 19 characters maximum')}>
  {...}
</Field>
```

### `email`

```jsx
<Field
  name="email"
  type="email"
  validate={email('Must be an e-mail')}>
  {...}
</Field>
```

### `alphanumeric`

```jsx
<Field
  name="username"
  validate={alphanumeric('Must be alphanumeric')}>
  {...}
</Field>
```

### `alpha`

```jsx
<Field
  name="username"
  validate={alpha('Must have only letters')}>
  {...}
</Field>
```

### `numeric`

```jsx
<Field
  name="code"
  validate={numeric('Must have only numbers')}>
  {...}
</Field>
```

### `lowercase`

```jsx
<Field
  name="username"
  validate={lowercase('Must be lowecase')}>
  {...}
</Field>
```

### `uppercase`

```jsx
<Field
  name="username"
  validate={uppercase('Must be lowecase')}>
  {...}
</Field>
```

# License

MIT © [fabiosaac12](https://github.com/fabiosaac12)
