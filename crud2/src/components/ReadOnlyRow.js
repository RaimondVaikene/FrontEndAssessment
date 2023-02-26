import React from 'react'

function ReadOnlyRow({ shipment, handleEditClick, handleDeleteClick }) {
  return (
   
            <tr>
        <td>{shipment.orderNo}</td>
        <td>{shipment.date}</td>
        <td>{shipment.customer}</td>
        <td>{shipment.trackingNo}</td>
        <td>{shipment.status}</td>
        <td>{shipment.consignee}</td>

        <td>
          <button
          type='button'
          onClick={(event) => handleEditClick(event, shipment)}
          >
            Edit
          </button>
          <button type='button' onClick={() => handleDeleteClick(shipment.id)}>Delete</button>
        </td>
    </tr>

  )
}

export default ReadOnlyRow
