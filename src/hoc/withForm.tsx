import React from 'react';
import { FormProvider } from '../Provider';

export const withForm = (Component: React.FC) => () => (
  <FormProvider>
    <Component />
  </FormProvider>
);
