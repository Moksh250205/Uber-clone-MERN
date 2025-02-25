import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';
import axios from 'axios';

const UserLogin = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        email: '', 
        password: '',
    });

    const {user , setUser} = useContext(userDataContext); 

    const handleChange = ((e) => {
        const {name, value} = e.target; 
        setFormData((prevFormData) => ({
            ...prevFormData, 
            [name]: value, 
        }));
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, formData);
            const userData = response.data.user;   
            setUser(userData);
            localStorage.setItem('token', response.data.token); 
            localStorage.setItem('user', JSON.stringify(response.data.user)); 
            navigate('/home')
        } catch (error) {
            console.error("Error logging in", error); 
        }
    }

    const {email , password} = formData; 

    return (
        <div className='p-7 h-screen w-screen flex justify-between flex-col'>
            <div>
                <form action="" onSubmit={handleSubmit}>
                    <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                    <h3 className='text-xl mb-2'>What's your email</h3>

                    <input
                        type="email"
                        name='email'
                        value={email}
                        onChange={handleChange}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        required
                        placeholder='email@example.com' />

                    <h3 className='text-xl mb-2'>Enter Password</h3>

                    <input
                        type="password"
                        required
                        name='password'
                        onChange={handleChange}
                        value={password}
                        placeholder='password'
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />

                    <button className='bg-[#111] text-gray-200 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
                </form>
                <div className='flex justify-center mb-5'>
                    <h3>Dont have an account?</h3>
                    <Link className='text-green-500 pl-1 font-semibold' to={'/signup'}>Create an account</Link>
                </div>
            </div>
            <div className='flex justify-center w-full'>
                <Link to={'/captain-signup'} className='bg-[#111] text-center text-gray-200 mb-7 w-full rounded px-4 py-2 text-lg placeholder:text-base' >Sign in as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin;