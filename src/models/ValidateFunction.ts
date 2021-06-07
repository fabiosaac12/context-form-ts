import { ErrorMessage } from './ErrorMessage';

export type ValidateFunction<T> = (value: T) => ErrorMessage | void;
