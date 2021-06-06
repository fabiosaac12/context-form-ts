import { createContext, FormEvent } from 'react'
import { FormState } from './models/FormState'
import { FormStateValueSetter } from './models/FormStateValueSetter'
import { FormStateSetter } from './models/FormStateSetter'
import { SubmitFunction } from './models/SubmitFunction'
import { ErrorMessage } from './models/ErrorMessage'
import { ValidateFunction } from './models/ValidateFunction'
import { Value } from './models/Value'

export type FormContextProps = {
  values: FormState<Value>
  setValue: FormStateValueSetter<Value>
  setValues: FormStateSetter<Value>
  errors: FormState<ErrorMessage>
  setError: FormStateValueSetter<string>
  setErrors: FormStateSetter<string>
  defaultValues: FormState<Value>
  setDefaultValue: FormStateValueSetter<Value>
  setDefaultValues: FormStateSetter<Value>
  cleanForm: () => void
  resetForm: () => void
  handleSubmit: (onSubmit: SubmitFunction) => (event?: FormEvent) => void
}

export const FormContext = createContext<FormContextProps>(
  {} as FormContextProps
)

export type FieldContextProps = (
  name: string
) => {
  value: Value
  setValue: (value: Value) => void
  error: ErrorMessage
  setError: (error: ErrorMessage | undefined) => void
  setValidateFunction: (fn: ValidateFunction<Value>) => void
  defaultValue: Value
  setDefaultValue: (value: Value) => void
  setResetFieldFunction: (fn: () => void) => void
  hasTriedToSubmit: boolean
}

export const FieldContext = createContext<FieldContextProps>(
  {} as FieldContextProps
)
