import { ValidateFunction } from '../models/ValidateFunction'
import { ErrorMessage } from '../models/ErrorMessage'

export const min = (
  n: number,
  errorMessage: ErrorMessage = true
): ValidateFunction<string> => (value) => {
  if (!(value.length >= n)) return errorMessage
}

export const max = (
  n: number,
  errorMessage: ErrorMessage = true
): ValidateFunction<string> => (value) => {
  if (!(value.length <= n)) return errorMessage
}

export const email = (
  errorMessage: ErrorMessage = true
): ValidateFunction<string> => (value) => {
  if (!Boolean(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.exec(value)))
    return errorMessage
}

export const alphanumeric = (
  errorMessage: ErrorMessage = true
): ValidateFunction<string> => (value) => {
  if (!Boolean(/^[a-z0-9]*$/i.exec(value))) return errorMessage
}

export const alpha = (
  errorMessage: ErrorMessage = true
): ValidateFunction<string> => (value) => {
  if (!Boolean(/^[a-z]*$/i.exec(value))) return errorMessage
}

export const numeric = (
  errorMessage: ErrorMessage = true
): ValidateFunction<string> => (value) => {
  if (!Boolean(/^[0-9]*$/i.exec(value))) return errorMessage
}

export const lowercase = (
  errorMessage: ErrorMessage = true
): ValidateFunction<string> => (value) => {
  if (!Boolean(/^[^A-Z]*$/.exec(value))) return errorMessage
}

export const uppercase = (
  errorMessage: ErrorMessage = true
): ValidateFunction<string> => (value) => {
  if (!Boolean(/^[^a-z]*$/.exec(value))) return errorMessage
}

export const compose = <T>(
  ...functions: ValidateFunction<T>[]
): ValidateFunction<T> => (value) => {
  let error

  for (let fn of functions) {
    const newError = fn(value)

    if (error) {
      error = newError

      if (typeof newError === 'string') break
    }
  }

  if (error) return error
}
