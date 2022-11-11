import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import ItemDetail from "../component/ItemDetail";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getPlanet } from "../../api/planets";
import { getVehicle } from "../../api/vehicles";
import { getSpecie } from "../../api/species";

import {getCharacter} from '../../api/characters';
import "../../styles/character.css"
import "../../styles/index.css"


export const Character =()=> {
  const params = useParams();

  const wikiPrefix = 'https://es.wikipedia.org/wiki/';
  const charId = params.CharacterId;
  const idgroup = '/characters/';

  const imgurl = `https://starwars-visualguide.com/assets/img/characters/${charId}.jpg`

  const [currentCharacter, setCurrentCharacter] = useState(charId);
  const [details, setDetails] = useState({});
  const [planetDetails, setPlanetDetails] = useState({});
  const characterHomeWorld = details?.homeworld;
  const characterHomeWorldId= characterHomeWorld?.split('/').slice(-2)[0];
  
  

  useEffect (() => {
	  getCharacter(currentCharacter).then(setDetails).catch(handleError);
    console.log("entra primer useffect");
	}, [currentCharacter]);
  useEffect (() => {
	  getPlanet(characterHomeWorldId).then(setPlanetDetails).catch(handleError);
    console.log("entra segundo useffect");
	}, [details]);

  function handleError(err) {
	  setErrorState({HasError: true, message: err.message});
	}




  return (
    <>


       
      
<div className="StarWarsSectionMainContainer">  
{ planetDetails&& (  <ItemDetail 
      itemUrlGroupId={idgroup}
      itemUrl={idgroup+charId}
      itemUrlId={charId}
      itemImg={imgurl}
      itemName={details.name} 
       key1="Gender: " 
       value1={details.gender}
       key2="Birthyear: " 
       value2={details.birth_year}
       key3="Height: "
       value3={`${details?.height} cm`}
        key4="Skin Color: "
        value4={details.skin_color}
        key5="Eye Color: "
        value5={details.eye_color}
        key6="Homeworld :"
        value6={<Link className ="SwLink"to={`/planets/${characterHomeWorldId}`}>{planetDetails?.name}</Link>}
        WikiSite="Wikipedia site: "
        WikiUrl={wikiPrefix+details.name}
        wikiDisplay={`Find more about ${details.name}`}
       />)}


</div>

    
    </>
  )
}

