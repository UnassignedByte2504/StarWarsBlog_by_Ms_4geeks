import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getSpaceship, getSpaceships, searchSpaceship } from '../../api/spaceships';
import ItemCard from "../component/ItemCard";
import { VECTORS } from "../../styles/vectors";

export const Spaceships = () =>{
	const inputSearch = useRef(null);
	const [textSearch, setTextSearch] = useState('');
  
	const [spaceships, setSpaceships] = useState([]); 
	const [currentSpaceship, setCurrentSpaceship] = useState(2);
	const [details, setDetails] = useState({});
  
	const [page, setPage] = useState(1);
  
	const sectionUrlPrefix = '/spaceships/';
	const [errorState, setErrorState] = useState({HasError: false});
   
	useEffect(() => {
	  getSpaceships(page).then(setSpaceships).catch(handleError);
	}, [page]);
  
	useEffect (() => {
	  getSpaceship(currentSpaceship).then(setDetails).catch(handleError);
	}, [currentSpaceship]);
  
	function handleError(err) {
	  setErrorState({HasError: true, message: err.message});
	}
  
	const showDetails = (spaceship) => {
	  const id = Number(spaceship.url.split('/').slice(-2)[0]);
	  setCurrentSpaceship(id); 

	  
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
	  searchSpaceship(textSearch).then(setSpaceships).catch(handleError);
  
	}
  
	const onChangePage = (next) => {
	  if (!Spaceships.previous && page + next <= 0) {
		return;
	  }
	  if (!Spaceships.next && page + next > 4) {
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
						placeholder='Search for a spaceship'
						onKeyDown={onSearchSubmit}
						></input>
					</div>
						<div className="StarWarsSectionTitle"><h2>Spaceships</h2></div>
						<div className="StarWarsSectionNav">
								<button className="StarWarsNavButton" onClick={() => onChangePage(-1)}>{VECTORS.prev}</button>
	  							<span> Current page: {page} </span>
	 							 {page < 4 ? <button className="StarWarsNavButton" onClick={() => onChangePage(+1)}>{VECTORS.next}</button>: <button className="StarWarsNavButton" onClick={() => setPage(1)}>{VECTORS.prev}{VECTORS.prev}</button>}
						</div>
						
	 		 	</div>
				<div className='StarWarsSectionContainer'>
					
					{errorState.HasError && <div>{errorState.message}</div>}
					{spaceships?.results?.map((spaceship) => (
						<ItemCard 
						key={spaceship.name}
						itemUrlId={Number(spaceship.url.split('/').slice(-2)[0])}
						itemUrlGroupId={spaceship.url.split('/').slice(-3)[0]}
						keyName={spaceship.name}
						itemName={spaceship.name}
						itemImg={`https://starwars-visualguide.com/assets/img/starships/`+Number(spaceship.url.split('/').slice(-2)[0])+'.jpg'}/>

					))}
			
				</div>
	</div>
	</>
	);
} 