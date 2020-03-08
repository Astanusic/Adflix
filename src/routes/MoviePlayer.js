import React, { Component } from 'react'
import axios from 'axios'

import { VideoPlayer, MvPlayerList, Spinner } from '../components/';
import { API_KEY, API_URL, IMAGE_BASE_URL, BACKDROP_SIZE } from '../config'

import "../css/MoviePlayer.css"

let newMovies = [];

class MoviePlayer extends Component {
    state = {
        movies: [
            {
                duration: "2h 9m",
                id: 429612,
                imageUrl: "http://image.tmdb.org/t/p/w1280//5myQbDzw318K9yofUXRJ4UTVgam.jpg",
                position: 1,
                title: "Spider-Man : Far from home",
                videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            },
            {
                duration: "2h 9m",
                id: 429617,
                imageUrl: "http://image.tmdb.org/t/p/w1280//5myQbDzw318K9yofUXRJ4UTVgam.jpg",
                position: 1,
                title: "Spider-Man : Far from home",
                videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            },
            {
                duration: "2h 9m",
                id: 429616,
                imageUrl: "http://image.tmdb.org/t/p/w1280//5myQbDzw318K9yofUXRJ4UTVgam.jpg",
                position: 1,
                title: "Spider-Man : Far from home",
                videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            },
            {
                duration: "2h 9m",
                id: 429614,
                imageUrl: "http://image.tmdb.org/t/p/w1280//5myQbDzw318K9yofUXRJ4UTVgam.jpg",
                position: 1,
                title: "Spider-Man : Far from home",
                videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            },
            {
                duration: "2h 9m",
                id: 429611,
                imageUrl: "http://image.tmdb.org/t/p/w1280//5myQbDzw318K9yofUXRJ4UTVgam.jpg",
                position: 1,
                title: "Spider-Man : Far from home",
                videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            }
            
        ],
        selectedMovie: {
            duration: "2h 9m",
            id: 429617,
            imageUrl: "http://image.tmdb.org/t/p/w1280//5myQbDzw318K9yofUXRJ4UTVgam.jpg",
            position: 1,
            title: "Spider-Man : Far from home",
            videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        },
        loading: true
    }
    async componentDidMount() {
        const oldMovies = JSON.parse(localStorage.getItem('movies'));
        const results = await this.getNewMovies(oldMovies);
        newMovies = oldMovies.map((oldMovie, index) => {
            return {
                id: oldMovie.id,
                position: index +1,
                title: oldMovie.title,
                duration: results[index],
                imageUrl: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${oldMovie.backdrop_path}}`,
                videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            }
        })
    }
    handleEnded = () => {
        console.log('video ended');
    }
    getTime = movieId => {
        return new Promise((resolve, reject) => {
            const url = `${API_URL}/movies/${movieId}?api_key=${API_KEY}&language=fr`;
            axios.get(url)
            .then(data => {
                const duration = data.data.duration;
                resolve(duration)
            })
            .catch(e => {
                console.log('e', e);
                reject('error', e);
            })
        })
    }

    getNewMovies = oldMovies => {
        let promises = [];
        for(let i; i>oldMovies; i++) {
            const element = oldMovies[i];
            const id = element.id;
            promises.push(this.getTime(id));
        }
        return Promise.all(promises);
    }
    render() {
        const { movies, selectedMovie } = this.state;
        return (
            <div className="moviePlayer">
                {this.state.loading ? 
                (
                    <Spinner />
                ):
                (
                    <>
                        <VideoPlayer 
                            videoUrl={selectedMovie.videoUrl}
                            imageUrl={selectedMovie.imageUrl}
                            handleEnded={this.handleEnded}    
                        />
                        <MvPlayerList 
                            movies={movies}
                            selectedMovie={selectedMovie}  
                        />

                    </>
                )}
            </div>
        )
    }
}

export { MoviePlayer}