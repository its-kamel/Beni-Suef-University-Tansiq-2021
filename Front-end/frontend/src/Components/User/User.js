import React from "react"
import Navbar from "../Navbar/Navbar";

function User() {
    return( 
        <>
            <Navbar
                isLogged= {true}
            />

            <h1>User</h1>
        </>
    );
}

export default User;