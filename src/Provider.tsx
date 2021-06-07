import React, { useState, useMemo, FC, FormEvent } from 'react';
import {
  FormContext,
  FieldContext,
  FieldContextProps,
  FormContextProps,
} from './Context';
import { SubmitFunction } from './models/SubmitFunction';
import { FormState } from './models/FormState';
import { ValidateFunction } from './models/ValidateFunction';
import { FormStateValueSetter } from './models/FormStateValueSetter';
import { ErrorMessage } from './models/ErrorMessage';
import { Value } from './models/Value';

export const FormProvider: FC = ({ children }) => {
  const [values, setValues] = useState<FormState<Value>>({});
  const [errors, setErrors] = useState<FormState<ErrorMessage>>({});
  const [validateFunctions, setValidateFunctions] = useState<
    FormState<ValidateFunction<Value> | undefined>
  >({});
  const [defaultValues, setDefaultValues] = useState<FormState<Value>>({});
  const [hasTriedToSubmit, setHasTriedToSubmit] = useState(false);
  const [resetFieldFuncions, setResetFieldFunctions] = useState<(() => void)[]>(
    [],
  );

  const setDefaultValue: FormStateValueSetter<Value> = (name, defaultValue) =>
    setDefaultValues((defaultValues) => ({
      ...defaultValues,
      [name]: defaultValue,
    }));

  const setValue: FormStateValueSetter<Value> = (name, value) =>
    setValues((values) => ({
      ...values,
      [name]: value,
    }));

  const setError: FormStateValueSetter<ErrorMessage | void> = (name, error) =>
    !error
      ? setErrors(({ [name]: _, ...otherErrors }) => otherErrors)
      : setErrors((errors) => ({
          ...errors,
          [name]: error,
        }));

  const setValidateFunction: FormStateValueSetter<
    ValidateFunction<Value> | undefined
  > = (name, validate) =>
    setValidateFunctions((validateFunctions) => ({
      ...validateFunctions,
      [name]: validate,
    }));

  const setResetFieldFunction = (resetFieldFunction: () => void) =>
    setResetFieldFunctions((resetFieldFunctions) => [
      ...resetFieldFunctions,
      resetFieldFunction,
    ]);

  const verifyErrors = () => {
    const newErrors = {};

    for (let name in validateFunctions) {
      const value = values[name] || '';
      const validate = validateFunctions[name];
      const newError = validate && validate(value);

      if (newError) newErrors[name] = newError;
    }

    if (Object.keys(newErrors).length < 1) return true;

    setErrors(newErrors);

    return false;
  };

  const handleSubmit = (onSubmit: SubmitFunction) => (e?: FormEvent) => {
    e?.preventDefault();

    if (verifyErrors()) onSubmit(values);
    else !hasTriedToSubmit && setHasTriedToSubmit(true);
  };

  const contextValue: FormContextProps = useMemo(
    () => ({
      values,
      setValue,
      setValues,
      defaultValues,
      setDefaultValue,
      setDefaultValues,
      errors,
      setError,
      setErrors,
      cleanForm: () => setValues({}),
      resetForm: () => {
        setValues(defaultValues);
        for (let fn of resetFieldFuncions) fn();
      },
      handleSubmit,
      hasTriedToSubmit,
    }),
    [values, defaultValues, errors],
  );

  const fieldContextValue: FieldContextProps = (name) =>
    useMemo(
      () => ({
        value: values[name],
        error: errors[name],
        setValue: (value) => setValue(name, value),
        setError: (error) => setError(name, error),
        setValidateFunction: (fn?) => setValidateFunction(name, fn),
        defaultValue: defaultValues[name],
        setDefaultValue: (defaultValue) => setDefaultValue(name, defaultValue),
        setResetFieldFunction,
        hasTriedToSubmit,
      }),
      [values[name], errors[name]],
    );

  return (
    <FormContext.Provider value={contextValue}>
      <FieldContext.Provider value={fieldContextValue}>
        {children}
      </FieldContext.Provider>
    </FormContext.Provider>
  );
};
