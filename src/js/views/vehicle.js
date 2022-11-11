import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getVehicle, getPeople, searchVehicle } from '../../api/vehicles';
import ItemDetail from "../component/ItemDetail";
import { VECTORS } from "../../styles/vectors";



export const Vehicle =()=> {
  const VehicleID = useParams();

  const vehiID = VehicleID.VehicleId;
 
  const wikiPrefix = 'https://es.wikipedia.org/wiki/';
  const imgurl = `https://starwars-visualguide.com/assets/img/vehicles/${vehiID}.jpg`

  const [currentVehicle, setCurrentVehicle] = useState(vehiID);
  const [details, setDetails] = useState({});

  useEffect (() => {
	  getVehicle(currentVehicle).then(setDetails).catch(handleError);

	}, [currentVehicle]);

  function handleError(err) {
	  setErrorState({HasError: true, message: err.message});
	}




  return (
    <>

        <div className="StarWarsSectionMainContainer"> 

          <ItemDetail 
          itemImg={imgurl}
          itemName={details.name}
          key3="Cost in galactic credits: "
          value3={details.cost_in_credits+' $'}
          key5="Cargo capacity: "
          value5={details.cargo_capacity}
          key2="Manufacturer: "
          value2={details.manufacturer}
          key4="Length: "
          value4={details.length+' meters'}
          key1="Model type: "
          value1={details.model}
          key6="Max Atmosphering speed: "
          value6={details.max_atmosphering_speed}
          key7="Crew capacity: "
          value7={details.crew}
          WikiUrl={wikiPrefix+details.name}
          WikiSite="Wikipedia site: "
          wikiDisplay={`Find more about ${details.name}`}
          />

        </div>
    
    </>
  )
}

