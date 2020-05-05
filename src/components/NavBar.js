import React from 'react';

const NavBar = ({ movies }) => {
    return (
        <div className="navbar">
            <h1>Movie List</h1>
            <p>Currently you have { movies.length } movies to watch...</p>
        </div>
    )
}

export default NavBar