import React from 'react'

export const CustomInput = ({ enabled, value, dataTestId, children }) => {
  if (!enabled) {
    return <span data-testid={dataTestId} className="disabled">{value}</span>
  }
  return children
}