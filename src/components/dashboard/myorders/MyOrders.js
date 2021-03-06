import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';


const MyOrders = () => {

    const [foods, setFoods] = useState([])
    const [user] = useAuthState(auth);
    useEffect(() => {
        fetch(`https://arcane-falls-40021.herokuapp.com/booking?email=${user.email}`)
            .then(res => res.json())
            .then(data => setFoods(data));
    }, [])
   
    const handleDelete = id =>{
        const proceed = window.confirm('Are you sure you want to delete?');
        if(proceed){
            console.log('deleting user with id',id);
            const url = `https://arcane-falls-40021.herokuapp.com/booking/${id}`;
            fetch(url,{
                method:'DELETE'

            })
            .then(res=>res.json())
            .then(data=>{
         if(data.deletedCount>0){
            console.log('deleted');
            const remaining = foods.filter(records=>records._id !==id);
            setFoods(remaining);

         }
            })
        }
    
            }

    return (
        <div className='bg-black'>
            <h2 className='text-white font-bold text-center text-2xl pt-5'>My Orders: {foods.length}</h2>
            <div class="overflow-x-auto pt-10 pb-10">
                <table class="table-compact w-full text-gray-400">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            foods.map((a, index) =><tr>
                                <th>{index + 1}</th>
                                <td className='text-center'>{a.partsname}</td>
                                <td className='text-center'>$ {a.price}</td>
                                <td className='text-center'>{a.quantity}</td>
                                <td className='text-center'>{a.address}</td>
                                <td className='text-center'>
                                <button onClick={()=>handleDelete(a._id)} className='text-white'>Delete</button>
                                </td>

                               
                            </tr>)
                        }
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;