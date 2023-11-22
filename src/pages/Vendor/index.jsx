import React, { useEffect, useState } from 'react';
import "./vendor.modular.css"
import axios from 'axios'
import BASE_URL from '../../config';
import BasicModal from '../Utils/Modals';
import { Box, Button, Modal, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Vendor = () => {
  //all datea are save in UserData state and run map fun to display screen
  const [userData, setUserData] = useState([]); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  // modalName modalCategory modalDesc editId all state are use for update functionality  
  const [modalName, setModalName] = useState("");
  const [modalCategory, setmodalCategory] = useState("");
  const [modalDesc, setmodalDesc] = useState("");
  const [editId, setEditId] = useState("")
  // mui open and close state
  const [open, setOpen] = useState(false);

  //! ************************Update-Functionality***************************
  // obj to send may id bhy jae ga...
  //modal open hoda is fun kay kay andr hamnay setOpen(true) kardeya hya 
  //!**************************  Modal-open function    *********************** 
  const handleOpen = (e) => {
    setOpen(true); 
    setModalName(e.target.parentNode.parentNode.children[0].innerText);
    // console.log(modalName);
    setmodalDesc(e.target.parentNode.parentNode.children[2].innerText);
    console.log(e.target.parentNode.parentNode.children[2].innerText);
    setmodalCategory(e.target.parentNode.parentNode.children[1].innerText)
    // console.log(modalDesc);
    setEditId(e.target.id)
    // console.log(editId);

  }
  //!**********  Modal-CLosed function and send updatedata from database   ******************
  
  const handleClose = async () => {
    try {
      const objToSend = {
        title: modalName,
        category: modalCategory,
        description: modalDesc,
      };
      console.log(objToSend);
      const res = await axios.put(`${BASE_URL}/updatepost/${editId}`, objToSend);
      if (res && res.data) {
        console.log(res.data);
      } else {
        console.error('Invalid response structure:', res);
      }
      fetchAllUser()
      setOpen(false);
    } catch (error) {
      console.error('Error updating data:', error);
      setOpen(false);
    }
  };

  // ****************** GET all date form database  ***********    
  const fetchAllUser = async () => {
    const res = await axios.get(`${BASE_URL}/allpost`)
    // console.log(res.data.allData);
    setUserData(res.data.allData)
  }
  useEffect(() => {
    fetchAllUser()
  }, [])

  //************* input say data send krna databae opr ****** */

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const objToSend = {
        title,
        description,
        category,
      };
      const response = await axios.post(`${BASE_URL}/createpost`, objToSend);
      console.log(response.data);
      fetchAllUser()
    }
    catch (error) {
      console.log(error);
    }
  }

  //************* DElETE FUNCTIONALITY ****** */

  const handleDel = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:7000/api/delpost/${id}`);
      // console.log(response);
      if (response.data.status === 200) {
        fetchAllUser()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='admin-heading'>Vendor screen</div>
      <div>
        <form onSubmit={handleSubmit} >
          <div className='admin-parent' >

            <input
              type="text"
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Your Description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled >Select Catergory</option>
              <option value="islamic">islamic</option>
              <option value="Education">Education</option>
              <option value="Science">Science</option>
            </select>
            {/* <Link to="/login">{"Already Have An Account? "}</Link> */}
            <button className='add-data' type="submit">Add Data</button>
          </div>
        </form>
      </div>

      {/* card-section */}
      <div className='card-parent'>
        {
          userData.map((item, i) => {
            return (
              <div key={i} className="card">
                <div className="header">
                  <p className="alert">{item.title}</p>
                </div>
                <div>
                  <p className="alert">{item.category}</p>
                </div>
                <p className="message">
                  {item.description}
                </p>
                <div className="actions">
                  <a id={item._id} className="read" onClick={handleOpen} >
                    Edit
                  </a>
                  <a onClick={() => handleDel(item._id)} className="mark-as-read" >
                    Delete
                  </a>
                </div>
              </div>
            )
          })
        }

      </div>

      <div>
        {/* <BasicModal /> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField id="standard-basic" value={modalName} onChange={(e) => setModalName(e.target.value)} label="Title" variant="standard" />
            <TextField id="standard-basic" value={modalCategory} onChange={(e) => setmodalCategory(e.target.value)} label="Category" variant="standard" />
            <TextField id="standard-basic" value={modalDesc} onChange={(e) => setmodalDesc(e.target.value)} label="Description" variant="standard" />
            <Button onClick={handleClose} >Submit</Button>
          </Box>
        </Modal>

      </div>
    </>
  )
};
export default Vendor;