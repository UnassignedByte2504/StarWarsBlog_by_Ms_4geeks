import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getPlanet, getPeople, searchPlanet } from '../../api/planets';
import ItemDetail from "../component/ItemDetail";



export const Planet =()=> {
  const PlanetID = useParams();

  const worldID = PlanetID.PlanetId;
 
  const wikiPrefix = 'https://es.wikipedia.org/wiki/';
  const imgurl = `https://starwars-visualguide.com/assets/img/planets/${worldID}.jpg`

  const [currentPlanet, setCurrentPlanet] = useState(worldID);
  const [details, setDetails] = useState({});

  useEffect (() => {
	  getPlanet(currentPlanet).then(setDetails).catch(handleError);
	}, [currentPlanet]);

  function handleError(err) {
	  setErrorState({HasError: true, message: err.message});
	}

  

  return (
    <>
    <div className="StarWarsSectionMainContainer">  
        <ItemDetail 
        itemImg={imgurl}
        itemName={details.name}
        key1="Diameter: "
        value1={details.diameter+' Km'}
        key2="Orbital Period: "
        value2={details.orbital_period+' days'}
        key3="Climate: "
        value3={details.climate}
        key4="Terrain type: "
        value4={details.terrain}
        key5="Population: "
        value5={details.population}
        key6="Gravity: "
        value6={details.gravity}
        WikiSite="Wikipedia site: "
        WikiUrl={wikiPrefix+details.name}
        wikiDisplay={`Find more about ${details.name}`}
        />
    </div>
    
    </>
  )
}