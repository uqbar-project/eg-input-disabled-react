import React from 'react'

export const CustomInput = ({ enabled, value, children }) => {
  if (!enabled) {
    return <span className="disabled">{value ?? children.props.value}</span>
  }
  return children
}