import React from 'react';
import MovieDetails from './MovieDetails';

const MovieList = ({movies, deleteMovie}) => {
    return movies.length ? (
        <div className="movie-list">
            <ul>
                {movies.map(movie => {
                    return (
                        <MovieDetails movie={movie} key={movie.id} deleteMovie={deleteMovie}/>
                    )
                })}
            </ul>
        </div>
    ) : (
        <div className="empty">No movies to watch... Add some or go outside?</div>
    )
}
 
export default MovieList;