
import React, { useEffect, useState } from 'react'
import './dashboard.modular.css'
import axios from 'axios';
import BASE_URL from '../../config';

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  console.log(userData);
  const fetchAllUser = async () => {
    const res = await axios.get(`${BASE_URL}/allpost`)
    console.log(res.data.allData);
    setUserData(res.data.allData)
  }
  useEffect(() => {
    fetchAllUser()
  }, [])
  return (
    <>   
        {userData.map((item,i) => {
          return (
            <>
             <div className="card">
              <div  className="content">
                <div className="title">{item.title}</div>
                <div className="description">
                {item.description}
                </div>
                <div>category:{item.category}</div>
              </div>
              <button>Buy now</button>
              </div>
            </>

          )

        })}
    </>
  )
}

export default Dashboard
