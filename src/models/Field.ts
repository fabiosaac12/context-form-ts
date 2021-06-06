import { Value } from './Value'
import { ValidateFunction } from './ValidateFunction'
import { ErrorMessage } from './ErrorMessage'

export type Field = React.SFC<FieldProps>

interface FieldProps {
  name: string
  defaultValue: Value
  validate: ValidateFunction<Value>
  children: FieldChildren
}

export type FieldChildren = (props: FieldChildrenProps) => JSX.Element

export interface FieldChildrenProps {
  name: string
  input: {
    value: Value
    onChange: (event: InputEvent) => void
    onBlur: (event: InputEvent) => void
  }
  info: {
    hasBeenTouched: boolean
    hasChanged: boolean
    error: ErrorMessage | undefined
  }
}
