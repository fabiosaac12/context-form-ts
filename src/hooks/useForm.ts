import { useContext } from 'react';
import { FormContext } from '../Context';

export const useForm = () => useContext(FormContext);
