import { FormState } from './FormState';
import { Dispatch } from 'react';

export type FormStateSetter<T> = Dispatch<FormState<T>>;
