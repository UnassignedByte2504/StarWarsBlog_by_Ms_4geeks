import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getFilm, getPeople, searchFilm } from '../../api/films';
import ItemDetail from "../component/ItemDetail";



export const Film =()=> {
  const filmID = useParams();

  const movieID = filmID.filmId;
 
  const wikiPrefix = 'https://es.wikipedia.org/wiki/';
  const imgurl = `https://starwars-visualguide.com/assets/img/films/${movieID}.jpg`

  const [currentFilm, setCurrentFilm] = useState(movieID);
  const [details, setDetails] = useState({});

  useEffect (() => {
	  getFilm(currentFilm).then(setDetails).catch(handleError);
	}, [currentFilm]);

  function handleError(err) {
	  setErrorState({HasError: true, message: err.message});
	}

  return (
    <>

<div className="StarWarsSectionMainContainer">  
    <ItemDetail
    itemImg={imgurl}
    itemName={details.title}
    key1="Episode Nº: "
    value1={details.episode_id}
    key2="Director: "
    value2={details.director}
    key3="Producers: "
    value3={details.producer}
    key4="Release date: "
    value4={details.release_date}
    WikiUrl={wikiPrefix+details.title}
    WikiSite="Wikipedia site: "
    wikiDisplay={`Find more about ${details.title}`}
    
    
    />
    
    </div>

    
    </>
  )
}