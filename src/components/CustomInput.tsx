type CustomInputPayload = {
  enabled: boolean;
  children?: JSX.Element;
  value?: unknown;
}

export const CustomInput = ({ enabled, children, value }: CustomInputPayload) =>
  enabled ? children : <span className="disabled">{value ?? children?.props.value}</span>