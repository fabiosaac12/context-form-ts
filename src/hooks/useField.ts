import { useContext } from 'react';
import { FieldContext } from '../Context';

export const useField = () => useContext(FieldContext);
