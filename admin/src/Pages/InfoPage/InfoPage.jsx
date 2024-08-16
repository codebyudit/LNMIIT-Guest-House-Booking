import React, { useState, useEffect } from 'react';
import './InfoPage.css';
import axios from 'axios';
import moment from 'moment'

const InfoPage = () => {
    const [info, setInfo] = useState([]);
    const url = "http://localhost:4001";

    const fetchInfo = async () => {
        try {
            const response = await axios.get(`${url}/api/info`);
            if (response.data.success) {
                setInfo(response.data.data);
            } else {
                console.error("Error fetching data");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className='list add flex-col'>
            <p>Students Applied For Guest House</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>photo</b>
                    <b>name</b>
                    <b>rollno</b>
                    <b>department</b>
                    <b>phoneno</b>
                    <b>guests</b>
                    <b>arrivalDate</b>
                    <b>departureDate</b>
                    <b>arrivalTime</b>
                </div>
                {info.map((item, index) => (
                    <div key={index} className="list-table-format">
                        <img src={`${url}/uploads/` + item.photo} />
                        <p>{item.name}</p>
                        <p>{item.rollno}</p>
                        <p>{item.department}</p>
                        <p>{item.phoneno}</p>
                        <p>{item.guests}</p>
                        <p>{moment(item.arrivalDate).format('YYYY-MM-DD')}</p>
                        <p>{moment(item.departureDate).format('YYYY-MM-DD')}</p>
                        <p>{item.arrivalTime}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoPage;
