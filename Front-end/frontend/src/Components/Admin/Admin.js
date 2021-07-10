import React from "react"
import Navbar from '../Navbar/Navbar'

function Admin() {
    return( 
        <>
        <Navbar
            isLogged= {true}
        />

        <h1>Admin</h1>
    </>
    );
}

export default Admin;