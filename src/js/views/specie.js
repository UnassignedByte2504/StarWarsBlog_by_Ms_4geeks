import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getSpecie, getPeople, searchSpecie } from '../../api/species';
import ItemDetail from "../component/ItemDetail";



export const Specie =()=> {
  const SpecieID = useParams();

  const specieId = SpecieID.SpecieId;
 
  const wikiPrefix = 'https://es.wikipedia.org/wiki/';
  const imgurl = `https://starwars-visualguide.com/assets/img/species/${specieId}.jpg`

  const [currentSpecie, setCurrentSpecie] = useState(specieId);
  const [details, setDetails] = useState({});

  useEffect (() => {
	  getSpecie(currentSpecie).then(setDetails).catch(handleError);

	}, [currentSpecie]);

  function handleError(err) {
	  setErrorState({HasError: true, message: err.message});
	}




  return (
    <>

<div className="StarWarsSectionMainContainer">  
    <ItemDetail 
    itemImg={imgurl}
    itemName={details.name}
    key1="Classification: "
    value1={details.classification}
    key2="Designation: "
    value2={details.designation}
    key3="Language"
    value3={details.language}
    key4="Average lifespan: "
    value4={details.average_lifespan}
    key5="Skin colors: "
    value5={details.skin_colors}
    key6="Eye colors: "
    value6={details.eye_colors}
    key7="Hair colors: "
    value7={details.hair_colors}
    WikiUrl={wikiPrefix+details.name}
    WikiSite="Wikipedia site: "
    wikiDisplay={`Find more about ${details.name}`}
    />

    </div>
    </>
  )
}