import React, { useContext } from 'react'
import AlertContext from '../../context/Alert/alertContext';
const Alert = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alert !== null&& (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"/>
        <span>{alertContext.alert.msg}</span>
      </div>
    )
  )
}
export default Alert;
