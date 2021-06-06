import React, { useState, useEffect } from 'react'
import { useField } from '../hooks'
import { InnerFieldProps } from '../Field'
import { Field } from '../models/Field'

export const withField: (InnerField: React.SFC<InnerFieldProps>) => Field = (
  InnerField
) => ({ defaultValue, ...props }) => {
  const [hasChanged, setHasChanged] = useState(false)
  const [hasBeenTouched, setHasBeenTouched] = useState(false)

  const getContextValue = useField()

  const {
    setDefaultValue,
    setValidateFunction,
    hasTriedToSubmit,
    setResetFieldFunction,
    ...contextValue
  } = getContextValue(props.name)

  useEffect(() => {
    if (defaultValue !== undefined) {
      contextValue.setValue(defaultValue)
      setDefaultValue(defaultValue)
    }

    setValidateFunction(props.validate)
    setResetFieldFunction(() => {
      setHasChanged(false)
      setHasBeenTouched(false)
    })
  }, [])

  useEffect(() => {
    if (hasTriedToSubmit) {
      setHasBeenTouched(true)
      setHasChanged(true)
    }
  }, [hasTriedToSubmit])

  const propsToField = {
    ...props,
    ...contextValue,
    hasChanged,
    hasBeenTouched,
    setHasChanged,
    setHasBeenTouched
  }

  return <InnerField {...propsToField} />
}
