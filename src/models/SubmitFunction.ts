import { FormState } from './FormState';
import { Value } from './Value';

export type SubmitFunction = (values: FormState<Value>) => void;
