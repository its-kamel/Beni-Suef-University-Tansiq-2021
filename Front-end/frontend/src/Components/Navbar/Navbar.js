import React, { useState } from "react"
import { Link} from 'react-router-dom'
import './Navbar.css'

function Navbar(props){
    const navStyle={ color:'white'};
    const [isLogged,setIsLogged] = useState(props.isLogged);

    function logOut(){
        // delete localStorage.token;
        localStorage.removeItem('token')
        setIsLogged(false)
        console.log(localStorage)
    }

    return(
        <>
        <header >
            <h1 className="navbar-header">  كلية التكنولوجيا و التعليم • جامعة بني سويف</h1>
        </header>
        {isLogged && <Link style={navStyle} to="/"><button className="logOut" onClick={logOut}>تسجيل الخروج</button></Link>}

        </>
    );
}

export default Navbar;