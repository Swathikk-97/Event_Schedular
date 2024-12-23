import React, { useState } from 'react';


function Table({handleEdit,events,handleDeleteEvent}) {
  const [viewItem,setViewItem]=useState(null)

 const handleview=(item)=>{
       setViewItem(item)
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(" form is submitted")
       handleEdit(viewItem)
   }
   
  return (
    <div style={{ marginRight: '600px', width: '800px' }}>
      <h1>Event List</h1>

      <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table className="table bg-primary" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th className="text-white bg-primary" scope="col">Title</th>
              <th className="text-white bg-primary" scope="col">Date</th>
              <th className="text-white bg-primary" scope="col">Location</th>
              <th className="text-white bg-primary" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No events to display.
                </td>
              </tr>
            ) : (
              events.map((event, index) => (
                <tr key={event.id || index}>
                  <td>{event.title}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td
                    style={{
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      border: 'none',
                    }}
                  >
                    <button type="button" 
                    className="btn2 bg-primary text-white"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                      onClick={()=>handleview(event)}
                    >
                      View/Edit
                      </button>
                    {/* <button type="button" 
                    className="btn2 bg-primary text-white" 
                    onClick={()=> handleEdit(event)}
                   >
                    Edit
                    </button> */}
                    <button type="button" 
                    className="btn2 bg-primary text-white" 
                    onClick={()=> handleDeleteEvent(event.id)}
                    >
                      Delete
                      </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div>
        {/* <button
          type="button"
          className="btn1 btn-primary btn-lg"
          style={{
            backgroundColor: 'green',
            color: 'white',
            borderRadius: '5px',
            height: '50px',
            width: '150px',
            border: 'none',
            marginLeft: '20px',
          }}
          onClick={() => window.location.href = '/add-event'} // Example action
        >
          Add New Event
        </button> */}
      </div>

{/* Modal Model */}


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="inputEmail4"
            value={viewItem? viewItem.title :""}
            onChange={(e)=>setViewItem({...viewItem,title:e.target.value})}
            
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="inputAddress" 
            value={viewItem? viewItem.description : ''}
            onChange={(e)=>setViewItem({...viewItem,description:e.target.value})}


          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress2" className="form-label">
            Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="inputAddress2"    
            value={viewItem? viewItem.date : ''}
            onChange={(e)=>setViewItem({...viewItem,date:e.target.value})}


          />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputCity" className="form-label">
            Location:
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCity" 
            value={viewItem? viewItem.location : ''}
            onChange={(e)=>setViewItem({...viewItem,location:e.target.value})}


          />
        </div>
        <button type='submit' data-bs-dismiss="modal">update</button>

      </form>
        
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  



    </div>
  );
}

export default Table;
