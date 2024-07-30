import React from 'react';
import Logo from '/ncp.png'
import { useNavigate } from 'react-router-dom'

const Cancel = () => {
    let navigate = useNavigate();
    const homeReturn = () => {
        const path = '/';
        navigate(path);
        }

    return (
    <>
            <img className="absolute logoCap z-20" src={Logo} alt="NcapLogo" onClick={homeReturn} />
        <div className="flex items-center justify-center h-screen">
            <div className="p-1 rounded shadow-lg bg-gradient-to-r from-purple-500 via-green-500 to-blue-500">
            <div className="flex flex-col items-center p-4 space-y-2 bg-white">
                <h1 className='font-extrabold text-2xl'>Oh, no!</h1>
                <h1
                className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Something went wrong
                </h1>
                <p>We weren't able to complete your purchase. Try again, or get in touch with us.</p>
                <a
               onClick={homeReturn} // You should replace this with the correct link or use a React Router Link
                className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">

                <span className="text-sm font-medium">
                    Home
                </span>
                </a>
            </div>
            </div>
        </div>
        </>
    )
};

export default Cancel;