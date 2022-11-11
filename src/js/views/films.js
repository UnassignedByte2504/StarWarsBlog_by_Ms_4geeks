import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getFilm, getFilms, searchFilm } from '../../api/films.js';
import ItemCard from "../component/ItemCard";
import { VECTORS } from "../../styles/vectors";

export const Films = () =>{
	const inputSearch = useRef(null);
	const [textSearch, setTextSearch] = useState('');
  
	const [films, setFilms] = useState([]); 
	const [currentFilm, setCurrentFilm] = useState(1);
	const [details, setDetails] = useState({});
  
	const sectionUrlPrefix = '/films/';

	const [page, setPage] = useState(1);
  
	const [errorState, setErrorState] = useState({HasError: false});
   
	useEffect(() => {
	  getFilms(page).then(setFilms).catch(handleError);
	}, [page]);
  
	useEffect (() => {
	  getFilm(currentFilm).then(setDetails).catch(handleError);
	}, [currentFilm]);
  
	function handleError(err) {
	  setErrorState({HasError: true, message: err.message});
	}
  
	const showDetails = (film) => {
	  const id = Number(film.url.split('/').slice(-2)[0]);
	  setCurrentFilm(id); 
	  
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
	  searchFilm(textSearch).then(setFilms).catch(handleError);
  
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
			placeholder='Search for a film'
			onKeyDown={onSearchSubmit}
			></input>
		</div>
			<div className="StarWarsSectionTitle"><h2>Films</h2></div>
			
	  </div>
	<div className='StarWarsSectionContainer'>
		
		{errorState.HasError && <div>{errorState.message}</div>}
		{films?.results?.map((film) => (

			<ItemCard 
			itemUrlId={Number(film.url.split('/').slice(-2)[0])}
			itemUrlGroupId={film.url.split('/').slice(-3)[0]}
			key={film.title}
			keyName={film.title}
			itemName={film.title}
			itemImg={`https://starwars-visualguide.com/assets/img/films/`+Number(film.url.split('/').slice(-2)[0])+'.jpg'}/>
		))}

	</div>
</div>
	</>
  );
} 