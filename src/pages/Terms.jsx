import Logo from '/nCap_logo.png'
import React from 'react';
import { useNavigate } from "react-router-dom";

const Terms = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);

    }
    return(
    <div className="termsPage bg-gray-100">
    <img className="absolute logoCap" src={Logo} alt="noCap Logo" onClick={routeChange} />
       <iframe src='../../essai.html'width='100%' height='100%' title='Terms and Conditions'></iframe>
    </div>
    )

    }


export default Terms;