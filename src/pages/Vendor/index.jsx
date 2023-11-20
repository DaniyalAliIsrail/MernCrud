import React, { useEffect, useState } from 'react';
import "./vendor.modular.css"
import axios from 'axios'
import BASE_URL from '../../config';
import BasicModal from '../Utils/Modals';

const Vendor = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  //!Modal state:
  

  const [userData, setUserData] = useState([]);
  // console.log(userData);
  const fetchAllUser = async () => {
    const res = await axios.get(`${BASE_URL}/allpost`)
    // console.log(res.data.allData);
    setUserData(res.data.allData)
  }
  useEffect(() => {
    fetchAllUser()
  }, [])


  // Open the modal and set the selected item for editing
  // const openModal = (item) => {
  //   setSelectedItem(item);
  //   setIsModalOpen(true);
  // };

  // // Close the modal
  // const closeModal = () => {
  //   setSelectedItem(null);
  //   setIsModalOpen(false);
  // };

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

                  <a  className="read" >
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
      <BasicModal />
      </div>
    </>
  )
};
export default Vendor;