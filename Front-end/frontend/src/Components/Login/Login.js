import React from "react"
import Navbar from "../Navbar/Navbar";

function Login() {

    return( 
        <>
            <Navbar
                isLogged= {false}
            />

            {/* Menna's Login Part */}
            <h1>Login Menna</h1>
        </>
    );
}

export default Login;