type CustomInputPayload = {
  enabled: boolean;
  children?: JSX.Element;
  value?: unknown;
}

export const CustomInput = ({ enabled, children, value }: CustomInputPayload) => {
  if (!enabled) {
    return <span className="disabled">{value ?? children?.props.value}</span>
  }
  return children
}