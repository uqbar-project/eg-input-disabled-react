import React from 'react'

export const CustomInput = ({ enabled, value, children }) => {
  if (!enabled) {
    return <span className="disabled">{value}</span>
  }
  return children
}