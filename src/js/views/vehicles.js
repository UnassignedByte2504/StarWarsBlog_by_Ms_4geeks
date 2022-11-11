import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getVehicle, getVehicles, searchVehicle } from '../../api/vehicles';
import ItemCard from "../component/ItemCard";
import { VECTORS } from "../../styles/vectors";

export const Vehicles = () =>{
	const inputSearch = useRef(null);
	const [textSearch, setTextSearch] = useState('');
  
	const [vehicles, setVehicles] = useState([]); 
	const [currentVehicle, setCurrentVehicle] = useState(4);
	const [details, setDetails] = useState({});

	const sectionUrlPrefix = '/vehicles/';
  
	const [page, setPage] = useState(1);
  
	const [errorState, setErrorState] = useState({HasError: false});
   
	useEffect(() => {
	  getVehicles(page).then(setVehicles).catch(handleError);
	}, [page]);
  
	useEffect (() => {
	  getVehicle(currentVehicle).then(setDetails).catch(handleError);

	}, [currentVehicle]);
  
	function handleError(err) {
	  setErrorState({HasError: true, message: err.message});
	}
  
	const showDetails = (Vehicle) => {
	  const id = Number(Vehicle.url.split('/').slice(-2)[0]);
	  setCurrentVehicle(id); 

	  
	}
  
	const onSearchChange = (e) => {
	  e.preventDefault();
	  const search = inputSearch.current.value;
	  setTextSearch(search);
	}
  
	const onSearchSubmit = (e) => {
  
	  if(e.key !== 'Enter') {
		return;
	  }
	  inputSearch.current.value = '';
	  setDetails({});
	  searchVehicle(textSearch).then(setVehicles).catch(handleError);
  
	}
  
	const onChangePage = (next) => {
	  if (!vehicles.previous && page + next <= 0) {
		return;
	  }
	  if (!vehicles.next && page + next > 4) {
		return;
	  }
	  setPage(page + next);
	}
  

	return (
		<>
		<div className="StarWarsSectionMainContainer">
	
				<div className='StarWarsSectionHeader'>
					<div className="StarWarsSectionSearch">
						<input ref={inputSearch}
						onChange={onSearchChange}
						className="SearchInput"
						type='text' 
						placeholder='Search for a vehicle'
						onKeyDown={onSearchSubmit}
						></input>
					</div>
						<div className="StarWarsSectionTitle"><h2>Vehicles</h2></div>
						<div className="StarWarsSectionNav">
								<button className="StarWarsNavButton" onClick={() => onChangePage(-1)}>{VECTORS.prev}</button>
	  							<span> Current page: {page} </span>
								  {page < 4 ? <button className="StarWarsNavButton" onClick={() => onChangePage(+1)}>{VECTORS.next}</button>: <button className="StarWarsNavButton" onClick={() => setPage(1)}>{VECTORS.prev}{VECTORS.prev}</button>}						
								  </div>
						
	 		 	</div>
				<div className='StarWarsSectionContainer'>
					
					{errorState.HasError && <div>{errorState.message}</div>}
					{vehicles?.results?.map((vehicle) => (
						<ItemCard
						key={vehicle.name}				
						itemUrlId={Number(vehicle.url.split('/').slice(-2)[0])}
						itemUrlGroupId={vehicle.url.split('/').slice(-3)[0]}
						keyName={vehicle.name}
						itemName={vehicle.name}
						itemImg={`https://starwars-visualguide.com/assets/img/vehicles/`+Number(vehicle.url.split('/').slice(-2)[0])+'.jpg'}/>
					))}
			
				</div>
	</div>
	</>
	);
} 