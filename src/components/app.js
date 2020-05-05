import React, { useState, useEffect } from "react";
import axios from 'axios'

import NavBar from "./NavBar";
import MovieList from "./MovieList"
import MovieForm from "./MovieForm"

const App = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/movies')
      .then(res => {
        console.log(res)
        setMovies(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="app">
      <NavBar movies={movies}/>
      <MovieList movies={movies}/>
      <MovieForm />
    </div>
  );
}
 
export default App;