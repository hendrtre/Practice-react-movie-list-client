import React, { useState, useEffect } from "react";
import axios from 'axios'

import NavBar from "./NavBar";
import MovieList from "./MovieList"
import MovieForm from "./MovieForm"

const App = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    // axios.get('http://localhost:5000/api/v1/movies')
    axios.get('https://flask-movie-list-api-tah.herokuapp.com/api/v1/movies')
      .then(res => {
        console.log(res)
        setMovies(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  async function addMovie(title, genre, image) {

    const imageFormData = new FormData()
    imageFormData.append('file', image)
    imageFormData.append('upload_preset', 'movie-list')

    try {
      const cloudinary = await axios(
        {
          method: "post",
          url: 'https://api.cloudinary.com/v1_1/practicemovieflask/image/upload',
          data: imageFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      console.log(cloudinary)
      const flask_database = await axios(
        {
          method: "post",
          // url: 'http://localhost:5000/api/v1/movie',
          url: 'https://flask-movie-list-api-tah.herokuapp.com/api/v1/movie',
          data: {
            title: title,
            genre: genre,
            // Either http or https
            // image_url: cloudinary.data.url
            image_url: cloudinary.data.secure_url,
            public_id: cloudinary.data.public_id
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      setMovies([...movies, flask_database.data])
    } catch (err) {
      console.log(err)
    }
  }

  const deleteMovie = (id) => {
    // axios.delete(`http://localhost:5000/api/v1/movie/${id}`)
    axios.delete(`https://flask-movie-list-api-tah.herokuapp.com/api/v1/movie/${id}`)
      .then(res => {
        console.log(res)
        setMovies(movies.filter(movie => movie.id !== id))
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="app">
      <NavBar movies={movies}/>
      <MovieList movies={movies} deleteMovie={deleteMovie}/>
      <MovieForm addMovie={addMovie}/>
    </div>
  );
}
 
export default App;