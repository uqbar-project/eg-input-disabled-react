import React, { ReactNode } from 'react'

type CustomInputPayload = {
  enabled: boolean;
  children?: React.ReactElement<{ value?: unknown }>;
  value?: unknown;
}

export const CustomInput = ({ enabled, children, value }: CustomInputPayload) =>
  enabled ? children : <span className="disabled">{(value ?? children?.props.value) as ReactNode}</span>