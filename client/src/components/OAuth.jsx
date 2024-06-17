import React from 'react'
import {app} from '../firebase'
import { useNavigate } from 'react-router-dom';
import {GoogleAuthProvider,getAuth,signInWithPopup} from 'firebase/auth';
export default function OAuth() {
  const navigate =useNavigate();

   const handleGoogleClick = async () =>{
    try{
            
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result =  await signInWithPopup(auth,provider);
            const res = await fetch('/api/auth/google',{
              method:'POST',
              headers: {
                'Content-Type':'application/json',
              },
              body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL}),
        
            })  ;
            if(res.ok){ 
              const data = await res.json();
              console.log('User Logged in succecfully',data);
            
            }else{
              consol.log('error occured',res.statusText);
            }
            navigate('/');
                     
    }catch(error){
      console.log(`could not sign in with google `,error);

    } }
  return (
    <button
    type='button' onClick={handleGoogleClick}
    className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
  >
    Continue with google
  </button>

  )
}