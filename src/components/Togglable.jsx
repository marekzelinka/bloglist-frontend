import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useReducer } from 'react'

export const Togglable = forwardRef(
  (
    {
      defaultVisible = false,
      openButtonLabel = 'open',
      closeButtonLabel = 'close',
      children,
    },
    ref,
  ) => {
    const [visible, toggleVisibile] = useReducer(
      (visible) => !visible,
      defaultVisible,
    )

    const hideWhenVisible = { display: visible ? 'none' : undefined }
    const showWhenVisible = { display: visible ? undefined : 'none' }

    useImperativeHandle(ref, () => {
      return {
        toggleVisibile,
      }
    })

    return (
      <div>
        <button type="button" onClick={toggleVisibile} style={hideWhenVisible}>
          {openButtonLabel}
        </button>
        <div style={showWhenVisible}>{children}</div>
        <button type="button" onClick={toggleVisibile} style={showWhenVisible}>
          {closeButtonLabel}
        </button>
      </div>
    )
  },
)
Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  defaultVisible: PropTypes.bool,
  openButtonLabel: PropTypes.string,
  closeButtonLabel: PropTypes.string,
}
