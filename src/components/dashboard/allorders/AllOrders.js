import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';


const AllOrders = () => {

    const [appointments, setAppointments] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/booking`)
                .then(res => res.json())
                .then(data => setAppointments(data));
        }
    }, [user])

    return (
        <div>
            <h2>My Appointments: {appointments.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Booked By</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Delivery Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((a, index) =><tr>
                                <th>{index + 1}</th>
                                <td>{a.email}</td>
                                <td>{a.partsname}</td>
                                <td>$ {a.price}</td>
                                <td>{a.quantity}</td>
                                <td>{a.address}</td>
                            </tr>)
                        }
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;