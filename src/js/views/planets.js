import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getPlanet, getPlanets, searchPlanet } from '../../api/planets.js';
import ItemCard from "../component/ItemCard";
import { VECTORS } from "../../styles/vectors";


export const Planets = props => {
	const inputSearch = useRef(null);
	const [textSearch, setTextSearch] = useState('');
  
	const [planets, setPlanets] = useState([]); 
	const [currentPlanet, setCurrentPlanet] = useState(1);
	const [details, setDetails] = useState({});
  
	const [page, setPage] = useState(1);
  
	const [errorState, setErrorState] = useState({HasError: false});

	const sectionUrlPrefix = '/planets/';
   
	useEffect(() => {
	  getPlanets(page).then(setPlanets).catch(handleError);
	}, [page]);
  
	useEffect (() => {
	  getPlanet(currentPlanet).then(setDetails).catch(handleError);
	}, [currentPlanet]);
  
	function handleError(err) {
	  setErrorState({HasError: true, message: err.message});
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
	  searchPlanet(textSearch).then(setPlanets).catch(handleError);
  
	}
  
	const onChangePage = (next) => {
	  if (!planets.previous && page + next <= 0) {
		return;
	  }
	  if (!planets.next && page + next > 6) {
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
			placeholder='Search for a planet'
			onKeyDown={onSearchSubmit}
			></input>
		</div>
			<div className="StarWarsSectionTitle"><h2>planets</h2></div>
			
			<div className="StarWarsSectionNav">
								<button className="StarWarsNavButton" onClick={() => onChangePage(-1)}>{VECTORS.prev}</button>
	  							<span> Current page: {page} </span>
								  {page < 6 ? <button className="StarWarsNavButton"onClick={() => onChangePage(+1)}>{VECTORS.next}</button>: <button className="StarWarsNavButton" onClick={() => setPage(1)}>{VECTORS.prev}{VECTORS.prev}</button>}
						</div>
	  </div>
	<div className='StarWarsSectionContainer'>
		
		{errorState.HasError && <div>{errorState.message}</div>}
		{planets?.results?.map((planet) => (
			<ItemCard 
			itemUrlId={Number(planet.url.split('/').slice(-2)[0])}
			itemUrlGroupId={planet.url.split('/').slice(-3)[0]}
			itemUrl={true}
			keyName={planet.name}
			itemName={planet.name}
			itemImg={`https://starwars-visualguide.com/assets/img/planets/`+Number(planet.url.split('/').slice(-2)[0])+'.jpg'}/>
		))}

	</div>
</div>
	</>
  );
};