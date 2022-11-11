import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getSpaceship, getPeople, searchSpaceship } from '../../api/spaceships';
import ItemDetail from "../component/ItemDetail";



export const Spaceship =()=> {
  const SpaceshipID = useParams();

  const spaceshipID = SpaceshipID.SpaceshipId;
 
  const wikiPrefix = 'https://es.wikipedia.org/wiki/';
  const imgurl = `https://starwars-visualguide.com/assets/img/starships/${spaceshipID}.jpg`

  const [currentSpaceship, setCurrentSpaceship] = useState(spaceshipID);
  const [details, setDetails] = useState({});

  useEffect (() => {
	  getSpaceship(currentSpaceship).then(setDetails).catch(handleError);

	}, [currentSpaceship]);

  function handleError(err) {
	  setErrorState({HasError: true, message: err.message});
	}




  return (
    <>
    <div className="StarWarsSectionMainContainer">  
    <ItemDetail
    itemImg={imgurl}
    itemName={details.name}
    key1="Model type: "
    value1={details.model}
    key2="Manufacturer: "
    value2={details.manufacturer}
    key3="Cost in galactic credits: "
    value3={details.cost_in_credits}
    key4="Hyperdrive rating: "
    value4={details.hyperdrive_rating}
    key5="Passengers capacity: "
    value5={details.passengers}
    key6="Length: "
    value6={details.length+' meters'}
    key7="Max atmosphering speed:  "
    value7={details.max_atmosphering_speed}
    WikiUrl={wikiPrefix+details.name}
    WikiSite="Wikipedia site: "
    wikiDisplay={`Find more about ${details.name}`}
    
    
    />
    
    </div>

    

    <div className="SpaceshipDetailsContainer container">
      <div className="SpaceshipImgContainer">
          <img src={imgurl} />
      </div>
      <div className="SpaceshipInfoContainer">
        <div className="CITitle">
          <h1>{details.name}</h1>
          <ul>
		        {Object.entries(details).filter(([key, value]) => key !== 'name' && key !== 'url' && key !== 'created' && key !== 'edited' && key !== 'films').map(([key, value]) => (
		          <li key={key}>
			        <strong className="DetailTitle">{key.replaceAll('_',' ')}</strong>: <span className="SpaceshipInfo">{value}</span> 
		          </li>
		  
		))}
	  </ul>
        </div>
      </div>
    </div>
    
    </>
  )
}