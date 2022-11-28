import React from 'react';
import dayjs from 'dayjs';
import './table-row.scss';

const TableRow = ({_id, name, email, dateRegistration, dateLogin, status, checked, onChange}) => {


  return (
    <tr>
      <td>
        <label>
          <input 
            className="filled-in"
            type="checkbox"
            id={_id}
            checked={checked}
            onChange={onChange}
          />
          <span></span>
        </label>
      </td>
      <td>{_id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{dayjs(dateRegistration).format('DD/MM/YYYY HH:mm:ssZ')}</td>
      <td>{dayjs(dateLogin).format('DD/MM/YYYY HH:mm:ssZ')}</td>
      <td>{status ? 'Blocked' : 'Unblocked'}</td>
    </tr>

  );
}

export default TableRow;
