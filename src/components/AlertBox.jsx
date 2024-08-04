import PropTypes from 'prop-types'

export function AlertBox({ alert }) {
  if (!alert) {
    return null
  }

  return (
    <div
      style={{
        borderStyle: 'solid',
        backgroundColor: 'lightgray',
        color: alert.status === 'error' ? 'red' : 'green',
        borderRadius: 5,
        padding: '12px 16px',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      {alert.message}
    </div>
  )
}
AlertBox.propTypes = {
  alert: PropTypes.shape({
    message: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['success', 'error']).isRequired,
  }),
}
