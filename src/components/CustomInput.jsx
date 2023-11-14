import PropTypes from 'prop-types'

export const CustomInput = ({ enabled, children, value }) => {
  if (!enabled) {
    return <span className="disabled">{value ?? children.props.value}</span>
  }
  return children
}

CustomInput.propTypes = {
  enabled: PropTypes.bool,
  children: PropTypes.element,
  value: PropTypes.any,
}