import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {

    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    

    const [error,setError]=useState('');
    const navigate=useNavigate();

    const handleSignup=async(e)=>{

        e.preventDefault();

        try{
            const response=await fetch ('/api/signup',{
                method:'POST',
                credentials:'include',//to add add cookie
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({

                    Email:email,
                    Username:username,
                    Password:password
                
                }),
            });

            if(!response.ok){
                const errData=await response.json();
                throw new Error(errData.msg || 'Signup failed')
            }

            navigate('/login')

        }

        catch(error){
            setError(error.message || 'Signup failed :Please try again ')
        }
    }


  return (
    
    <div className='bg-gray-200 h-screen justify-items-center pt-20'>

            <div>
                <p className="text-3xl font-bold text-blue-800">Certificate App</p>
            </div>

            <br />
            <br />

        <div className="bg-cyan-50 w-6/12 shadow-lg shadow-teal-950">

            <br />

            <h3 className="text-center text-2xl font-bold">
                Signup
            </h3>

            {error && <p className='text-red-500 mb-4'>{error}</p>}

            <form onSubmit={handleSignup} className="justify-items-center pt-7  text-xl">

                <br />
         
                <div> 
                    Username:
                </div>
             
             
                <div>

                    <input 
                    type="text"
                    className="w-80 ring-1 ring-red-600"
                    value={username}
                    
                    onChange={(e)=>setUsername(e.target.value)}
                    required
                    />

                </div>

                <br />

                <div> 
                    Email:
                </div>
             
             
                <div>
                    <input 
                    type="text"
                    className="w-80 ring-1 ring-red-600"
                    value={email}
                    
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    
                    
                    />
                </div>

                <br />
                

                <div>
                    Password:
                </div>

                <div>
                    <input type="password"  
                    className="w-80 ring-1 ring-red-600"
                    value={password}
                    
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    />
                </div>


                <br />

                
                <div>
         
                    <input type="submit" value="Signup" className="bg-sky-700 w-28  text-white hover:bg-lime-400 hover:text-blue-900"/>
             
                </div> 

                <br />

                <div className='flex gap-12'>

                    <label className='font'>Already have a account.</label>

                    <Link to="/login">
                    
                        <p className='hover:text-blue-600 font-bold'>Login</p>

                    </Link>
                
                </div>

             
               <br />

            </form> 

        </div>

    </div>

   
     
  )
}

export default Signup