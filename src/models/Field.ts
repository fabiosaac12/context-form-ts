import { Value } from './Value';
import { ValidateFunction } from './ValidateFunction';
import { ErrorMessage } from './ErrorMessage';
import { ChangeEvent } from 'react';

export type Field = React.FC<FieldProps>;

interface FieldProps {
  name: string;
  defaultValue?: Value;
  validate?: ValidateFunction<Value>;
  children: FieldChildren;
}

export type FieldChildren = (props: FieldChildrenProps) => JSX.Element;

export interface FieldChildrenProps {
  name: string;
  input: {
    value: Value;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  info: {
    hasBeenTouched: boolean;
    hasChanged: boolean;
    error: ErrorMessage | undefined;
  };
  [key: string]: any;
}
