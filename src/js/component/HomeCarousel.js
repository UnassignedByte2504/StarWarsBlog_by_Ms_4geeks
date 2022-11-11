import React from 'react'
import { Link } from 'react-router-dom'
import "../../styles/HomeCarousel.css"
import "../../styles/index.css"

function HomeCarousel () {

  return (
    <>
    <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="5" aria-label="Slide 6"></button>
    </div>
    <div className="carousel-inner CarouselContainer">
    
    <div className="carousel-item active">
        <img src="https://starwars-visualguide.com/assets/img/characters/35.jpg" className="d-block w-100 CarouselImg shadow" alt="..." />
        <div className="carousel-caption d-none d-md-block">
        <Link className="SwLink"to="/characters"> <h5>Characters</h5> </Link>
          <p>Get all the info you want about every character in the films.</p>
        </div>
      </div>
     
      <div className="carousel-item">
        <img src="https://starwars-visualguide.com/assets/img/planets/13.jpg" className="d-block w-100 CarouselImg shadow" alt="..." />
        <div className="carousel-caption d-none d-md-block">
        <Link className="SwLink"to="/planets"> <h5>Planets</h5> </Link>
          <p>All the information about every world. Population, species and more...</p>
        </div>
      </div>
      <div className="carousel-item">
        <img src="https://starwars-visualguide.com/assets/img/vehicles/6.jpg" className="d-block w-100 CarouselImg shadow" alt="..." />
        <div className="carousel-caption d-none d-md-block">
        <Link className="SwLink"to="/vehicles"> <h5>Vehicles</h5> </Link>
          <p>Vehicles of all kind...</p>
        </div>
      </div>
      <div className="carousel-item">
        <img src="https://starwars-visualguide.com/assets/img/species/6.jpg" className="d-block w-100 CarouselImg shadow" alt="..." />
        <div className="carousel-caption d-none d-md-block">
        <Link className="SwLink"to="/species"> <h5>Species</h5> </Link>
          <p>Learn about what makes unique every</p>
        </div>
      </div>
      <div className="carousel-item">
        <img src="	https://starwars-visualguide.com/assets/img/starships/10.jpg" className="d-block w-100 CarouselImg shadow" alt="..." />
        <div className="carousel-caption d-none d-md-block">
        <Link className="SwLink"to="/spaceships"> <h5>Spaceships</h5> </Link>
          <p>All the specs about every Starship</p>
        </div>
      </div>  
      <div className="carousel-item">
        <img src="https://starwars-visualguide.com/assets/img/films/1.jpg" className="d-block w-100 CarouselImg shadow" alt="..." />
        <div className="carousel-caption d-none d-md-block">
        <Link className="SwLink"to="/films"> <h5>Films</h5> </Link>
          <p>The information about every movie released!</p>
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  </>
  )
}

export default HomeCarousel