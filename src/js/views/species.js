import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getSpecie, getSpecies, searchSpecie } from '../../api/species';
import ItemCard from "../component/ItemCard";
import { VECTORS } from "../../styles/vectors";

export const Species = () =>{
	const inputSearch = useRef(null);
	const [textSearch, setTextSearch] = useState('');
  
	const [Species, setSpecies] = useState([]); 
	const [currentSpecie, setCurrentSpecie] = useState(1);
	const [details, setDetails] = useState({});
  
	const sectionUrlPrefix = '/species/';
	const [page, setPage] = useState(1);
  
	const [errorState, setErrorState] = useState({HasError: false});
   
	useEffect(() => {
	  getSpecies(page).then(setSpecies).catch(handleError);
	}, [page]);
  
	useEffect (() => {
	  getSpecie(currentSpecie).then(setDetails).catch(handleError);

	}, [currentSpecie]);
  
	function handleError(err) {
	  setErrorState({HasError: true, message: err.message});
	}
  
	const showDetails = (Specie) => {
	  const id = Number(Specie.url.split('/').slice(-2)[0]);
	  setCurrentSpecie(id); 


	  
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
	  searchSpecie(textSearch).then(setSpecies).catch(handleError);
  
	}
  
	const onChangePage = (next) => {
	  if (!Species.previous && page + next <= 0) {
		return;
	  }
	  if (!Species.next && page + next > 4) {
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
						placeholder='Search for a specie'
						onKeyDown={onSearchSubmit}
						></input>
					</div>
						<div className="StarWarsSectionTitle"><h2>Species</h2></div>
						<div className="StarWarsSectionNav">
								<button className="StarWarsNavButton" onClick={() => onChangePage(-1)}>{VECTORS.prev}</button>
	  							<span> Current page: {page} </span>
								  {page < 4 ? <button className="StarWarsNavButton" onClick={() => onChangePage(+1)}>{VECTORS.next}</button>: <button className="StarWarsNavButton" onClick={() => setPage(1)}>{VECTORS.prev}{VECTORS.prev}</button>}						
						</div>
						
	 		 	</div>
				<div className='StarWarsSectionContainer'>
					
					{errorState.HasError && <div>{errorState.message}</div>}
					{Species?.results?.map((specie) => (
						<ItemCard
						key={specie.name}
						itemUrlId={Number(specie.url.split('/').slice(-2)[0])}
						itemUrlGroupId={specie.url.split('/').slice(-3)[0]}
						keyName={specie.name}
						itemName={specie.name}
						itemImg={`https://starwars-visualguide.com/assets/img/species/`+Number(specie.url.split('/').slice(-2)[0])+'.jpg'}/>
					))}
			
				</div>
	</div>
	</>
	);
} ;