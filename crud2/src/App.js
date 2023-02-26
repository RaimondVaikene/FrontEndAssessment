import React, { useState } from "react";
import { nanoid } from "nanoid";
import './App.css';
import data from "./mock-data.json";
import { Fragment } from "react";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

function App() {

const [shipments, setShipments] = useState(data); 


const [addFormData, setAddFormData] = useState({ 
  orderNo: "",
  date: "",
  customer: "",
  trackingNo: "",
  status: "",
  consignee: "",
});

const [editFormData, setEditFormData] = useState({
  orderNo: "",
  date: "",
  customer: "",
  trackingNo: "",
  status: "",
  consignee: "",
})

const [editShipmentId, setEditShipmentId] = useState(null);

const handleAddFormChange = (event) => {
  event.preventDefault()

  const fieldName = event.target.getAttribute("name"); 
  const fieldValue = event.target.value; 

  const newFormData = { ...addFormData }; 
  newFormData[fieldName] = fieldValue;

  setAddFormData(newFormData);

}

 const handleEditFormChange = (event) => {
  event.preventDefault() 

  const fieldName = event.target.getAttribute("name");
  const fieldValue = event.target.value;

  const newFormData = { ...editFormData }
  newFormData[fieldName] = fieldValue;

  setEditFormData(newFormData);


}

const handleAddFormSubmit = (event) => {

  event.preventDefault();

  const newShipment = {
    id: nanoid(),
    orderNo: addFormData.orderNo,
    date: addFormData.date,
    customer: addFormData.customer,
    trackingNo: addFormData.trackingNo,
    status: addFormData.status,
    consignee: addFormData.consignee,

  };
 
  const newShipments = [...shipments, newShipment]; 
setShipments(newShipments);
};

const handleEditFormSubmit = (event) => {
  event.preventDefault();

  const editedShipment = {
    id: editShipmentId,
    orderNo: editFormData.orderNo,
    date: editFormData.date,
    customer: editFormData.customer,
    trackingNo: editFormData.trackingNo,
    status: editFormData.status,
    consignee: editFormData.consignee
  }

  const newShipments = [...shipments];

  const index = shipments.findIndex((shipment) =>
 shipment.id === editShipmentId)

 newShipments[index] = editedShipment;

 setShipments(newShipments);
 setEditShipmentId(null);

}


const handleEditClick = (event, shipment) => { 
  event.preventDefault();
  setEditShipmentId(shipment.id);

  const formValues = {

    orderNo: shipment.orderNo,
      date: shipment.date,
      customer: shipment.customer,
      trackingNo: shipment.trackingNo,
      status: shipment.status,
      consignee: shipment.consignee,
 
  }

  setEditFormData(formValues);
}

const handleCancelClick = () => {
  setEditShipmentId(null);
}

const handleDeleteClick = (shipmentId) => {

  const newShipments = [...shipments]

  const index = shipments.findIndex((shipment) => shipment.id === shipmentId)

  newShipments.splice(index, 1);

  setShipments(newShipments);

}

  return (

    <div className="app-container">
<form onSubmit={handleEditFormSubmit}>
<table>
  <thead>
    <tr>
      <th>OrderNo</th>
      <th>DeliveryDate</th>
      <th>Customer</th>
      <th>TrackingNo</th>
      <th>Status</th>
      <th>Consignee</th>
      <th>Actions</th>
  
    </tr>
  </thead>

  <tbody>

{shipments.map((shipment) => ( 
  <Fragment>
    {editShipmentId === shipment.id ? (

 <EditableRow 
 editFormData={editFormData} 
 handleEditFormChange={handleEditFormChange}
 handleCancelClick={handleCancelClick}
 />
    ) : (
<ReadOnlyRow 
shipment={shipment}
handleEditClick={handleEditClick}
handleDeleteClick={handleDeleteClick}
/> 
    )}
</Fragment>

))}

  </tbody>
</table>
</form>

<div className="add-form">

  <div>
    <h2>Shipment details</h2>
  </div>
  
      <form onSubmit={handleAddFormSubmit}>
        
        <div>
          <p>OrderNo</p>
        <input
          type="text"
          name="orderNo"
          required="required"
          placeholder="Enter OrderNo"
          onChange={handleAddFormChange}
        />
      </div>
       
       <div>
        <p>Date</p>
        <input
          type="text"
          name="date"
          required="required"
          placeholder="Enter DeliveryDate"
          onChange={handleAddFormChange}
        />
        </div>
        
        <div>
          <p>Customer</p>
        <input
          type="text"
          name="customer"
          required="required"
          placeholder="Enter Customer"
          onChange={handleAddFormChange}
        />
   </div>
    
    <div>
      <p>TrackingNo</p>
        <input
          type="text"
          name="trackingNo"
          required="required"
          placeholder="Enter TrackingNo"
          onChange={handleAddFormChange}
        />
    </div>

    <div>
      <p>Status</p>
        <input
          type="text"
          name="status"
          required="required"
          placeholder="Enter Status"
          onChange={handleAddFormChange}
        />
      </div>
        
        <div>
          <p>Consignee</p>
        <input
          type="text"
          name="consignee"
          required="required"
          placeholder="Enter Consignee"
          onChange={handleAddFormChange}
        />
       </div>
       
       <button type="submit">Add</button>
      </form>
      
      
      </div>

    </div>
  );
}

export default App;
