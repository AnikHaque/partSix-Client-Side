import React, { useState } from 'react';


const UserRow = ({ user, refetch }) => {
    const [emaill,setEmail] = useState('')
  const {email,role} = user;
   
    const makeAdmin = (e) => {
       
        fetch('https://arcane-falls-40021.herokuapp.com/users/admin',{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
            })
  .then(res=>res.json())
  .then(data=>{
  if(data.modifiedCount){
      alert('Successfully made admin');
    setEmail('');
    console.log(data);
    
  }
   
  })
  
        e.preventDefault()
    }
    return (
        <tr>
            <th>1</th>
            <td>{email}</td>
            <td>{role !== 'admin' && <button onClick={makeAdmin} class="btn btn-xs">Make Admin</button>}</td>
            <td><button class="btn btn-xs">Remove User</button></td>
        </tr>
    );
};

export default UserRow;