import React from 'react'

const MovieDetails = ({ movie, deleteMovie }) => {
    return (
        <li onClick={() => deleteMovie(movie.id)}>
            <div className="title">{movie.title}</div>
            <div className="genre">{movie.genre}</div>
            <img src={movie.image_url} alt=""/>
        </li>
    )
}

export default MovieDetails