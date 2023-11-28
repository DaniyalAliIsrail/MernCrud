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
  //frontend say file bhja hay abhy srf to is state may save karwaya hu
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("")

  //! ************************Update-Functionality***************************
  // obj to send may id bhy jae ga...
  //modal open hoda is fun kay kay andr hamnay setOpen(true) kardeya hya 
  //!**************************  Modal-open function    *********************** 
  const handleOpen = (item) => {
    setOpen(true);
    setModalName(item.title)
    setmodalDesc(item.description)
    setmodalCategory(item.category)
    console.log(item);
    setEditId(item._id)
    // console.log(editId);

  }
  //!******  Modal-CLosed function and send updatedata from database   *******

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

  //************ Handle Image Change   ************ */

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setImageFile(e.target.files[0])
    return
  }

  const handleImageUpload = async () => {
    try {
      if (!imageFile) {
        console.log("please select an image");
        return
      }
      const formData = new FormData();
      formData.append("image", imageFile)

      const response = await axios.post(`http://localhost:7000/api/uploadimage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data
      );
      if (response.status === 200) {
        setImageUrl(response.data.data.secure_url)
      } else {
        console.log("Image upload failed:", response.data.message);
        setImageUrl(null)
      }
    } catch (err) {
      console.error("Error uploading image:", err.message);
      setImageUrl(null)
    }
  }

  // ********** GET all date form database  ***********    
  const fetchAllUser = async () => {
    const res = await axios.get(`${BASE_URL}/allpost`)
    // console.log(res.data.allData);
    setUserData(res.data.allData)
  }
  useEffect(() => {
    fetchAllUser()
  }, [])
  //************* input say data send krna database pr** */

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!imageFile) {
        console.log("Please select an image");
        alert("Please select an image")
        return;
      }
      await handleImageUpload();
      console.log(imageUrl)

      if (!title ||
        !description ||
        !category ||
        !imageUrl) {
        alert("please fill all the filled")
        return
      }

      const objToSend = {
        title,
        description,
        category,
        imageUrl,
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
          <div className='admin-parent'>
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

            <input type="file" accept='image/*' onChange={handleImageChange} />
            {/* <Link to="/login">{"Already Have An Account? "}</Link> */}
            <button className='add-data' type="submit">Add Data</button>
          </div>
        </form>
      </div>

      {/* cards--temp */}
      {/* <div className="card">
      {userData.map((item,i)=>(
        <div key={i}>
        <div>
          <img className='image' src={item.imageUrl}></img>
        </div>
        <div className="content">
          <a href="#">
            <span className="title">
             {item.title}
            </span>
          </a>
          <p className="desc">
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
       </div>
      ))}
</div> */}

      {/* card-section  */}
      <div className='card-parent'>
        {
          userData.map((item, i) => {
            return (
              <div key={i} className="card">
                <div>
                  <img style={{ width: 150 }} src={item.imageUrl}></img>
                </div>
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
                  <a  className="read" onClick={() => handleOpen(item)} >
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