import { memo, Dispatch } from 'react'
import { withField } from './hoc'
import { ValidateFunction } from './models/ValidateFunction'
import { ErrorMessage } from './models/ErrorMessage'
import { Value } from './models/Value'
import {
  FieldChildren,
  FieldChildrenProps,
  Field as FieldType
} from './models/Field'

export interface InnerFieldProps {
  children: FieldChildren
  name: string
  validate?: ValidateFunction<Value>
  hasBeenTouched: boolean
  hasChanged: boolean
  error?: ErrorMessage
  value: Value
  setValue: Dispatch<Value>
  setError: Dispatch<ErrorMessage | void>
  setHasChanged: Dispatch<boolean>
  setHasBeenTouched: Dispatch<boolean>
  [key: string]: any
}

export const Field: FieldType = withField(
  memo<InnerFieldProps>(
    ({
      children,
      name,
      validate,
      hasBeenTouched,
      hasChanged,
      error,
      value,
      setValue,
      setHasChanged,
      setHasBeenTouched,
      setError,
      ...otherProps
    }) => {
      const propsToRender: FieldChildrenProps = {
        ...otherProps,
        name,
        input: {
          value: value === undefined ? '' : value,
          onChange: ({ target }) => {
            const {
              type,
              checked,
              value: inputValue
            } = target as HTMLInputElement

            const value =
              type === 'checkbox'
                ? checked
                : type === 'number'
                ? +inputValue
                : inputValue

            setValue(value)
            !hasChanged && setHasChanged(true)

            const newError = validate && validate(value)
            newError !== error && setError(newError)
          },
          onBlur: () => {
            if (!hasBeenTouched) {
              setHasBeenTouched(true)

              if (!hasChanged) {
                const newError = validate && validate(value || '')
                newError !== error && setError(newError)
              }
            }
          }
        },
        info: {
          hasBeenTouched,
          hasChanged,
          error
        }
      }

      return children(propsToRender)
    },
    (prev, next) =>
      !(
        prev.value !== next.value ||
        prev.hasChanged !== next.hasChanged ||
        prev.hasBeenTouched !== next.hasBeenTouched ||
        prev.error !== next.error
      )
  )
)
