import React from 'react'

const alert = ({alert}) => {
  return (
    alert !== null&& (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"/>
        <span>{alert.msg}</span>
      </div>
    )
  )
}
export default alert;
