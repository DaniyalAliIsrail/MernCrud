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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [modalName, setModalName] = useState("");
  const [modalCategory, setmodalCategory] = useState("");
  const [modalDesc, setmodalDesc] = useState("");
  const [editId, setEditId] = useState("")
  // mui open and close state
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  // obj to send may id bhy jae ga...
  //modal open hoda is fun kay kay andr hamnay setOpen(true) kardeya hya 
  const handleOpen = (e) => {
    // console.log(e.target.parentNode.parentNode.children[0].children[0].innerText)
    setModalName(e.target.parentNode.parentNode.children[0].innerText);
    console.log(modalName);
    setmodalDesc(e.target.parentNode.parentNode.children[2].innerText);
    console.log(e.target.parentNode.parentNode.children[2].innerText);
    setmodalCategory(e.target.parentNode.parentNode.children[1].innerText)
    console.log(modalDesc);
    setEditId(e.target.id)
    console.log(editId);
    setOpen(true);

  }
  const handelModalSubmit =async ()=>{
  console.log("chal gya func");
  const objToSend = {
    editId,
    modalName,
    modalCategory,
    modalDesc
  };
  console.log(objToSend);
  }


  const [userData, setUserData] = useState([]);
  // console.log(userData);
  const fetchAllUser = async () => {
    const res = await axios.get(`${BASE_URL}/allpost`)
    // console.log(res.data.allData);
    setUserData(res.data.allData)
    // console.log(res.data.allData)
  }
  useEffect(() => {
    fetchAllUser()
  }, [])


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
            <TextField id="standard-basic" value={modalName} onChange={(e) => setModalName(e.target.value)} label="Standard" variant="standard" />
            <TextField id="standard-basic"  value={modalCategory} onChange={(e) => setmodalCategory(e.target.value)} label="Standard" variant="standard" />
            <TextField id="standard-basic" value={modalDesc}  onChange={(e) => setmodalDesc(e.target.value)} label="Standard" variant="standard" />
            <Button onClick={handelModalSubmit} >Submit</Button>
          </Box>
        </Modal>

      </div>
    </>
  )
};
export default Vendor;