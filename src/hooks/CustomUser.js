import { useEffect, useState } from "react"

const CustomUser = user =>{
    const [token, setToken] = useState('');

    useEffect(()=>{
console.log(user);
const email = user?.user?.email;
const currentUser = {email:email};
if(email){
    fetch(`https://arcane-falls-40021.herokuapp.com/user/${email}`, {
        method:'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify(currentUser)
    })
    .then(res=>res.json())
    .then(data => {
        console.log('data inside useToken', data);
        
        setToken(data);
    })
}

    },[user])
    return [token];
}
export default CustomUser;
