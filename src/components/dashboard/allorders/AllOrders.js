import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
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

    const handleDelete = id =>{
        const proceed = window.confirm('Are you sure you want to delete?');
        if(proceed){
            console.log('deleting user with id',id);
            const url = `http://localhost:5000/booking/${id}`;
            fetch(url,{
                method:'DELETE'

            })
            .then(res=>res.json())
            .then(data=>{
         if(data.deletedCount>0){
            console.log('deleted');
            const remaining = appointments.filter(records=>records._id !==id);
            setAppointments(remaining);

         }
            })
        }
    
            }

    return (
        <div className='bg-black'>
            <h2 className='text-white font-bold text-center text-2xl pt-5'>My Appointments: {appointments.length}</h2>
            <div class="overflow-x-auto pt-10 pb-10">
                <table class="table-compact w-full text-gray-400 ">
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
                                <th className='pb-3'>{index + 1}</th>
                                <td className='text-center'>{a.email}</td>
                                <td className='text-center'>{a.partsname}</td>
                                <td className='text-center'>$ {a.price}</td>
                                <td className='text-center'>{a.quantity}</td>
                                <td className='text-center'>{a.address}</td>
                                <td className='text-center'>
                                <button  className='btn btn-primary text-white'>
    <Link to={`/update/${a._id}`}>Edit</Link>
   </button>
                                </td>
                                <td className='text-center'>
                                <button onClick={()=>handleDelete(a._id)} className=' text-white btn btn-error'>Delete</button>
                                </td>
                               
                                
                            </tr>)
                        }
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;