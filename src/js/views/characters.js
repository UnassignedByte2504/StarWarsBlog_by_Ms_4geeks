import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes, { number } from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getCharacter, getPeople, searchCharacter } from '../../api/characters';
import ItemCard from "../component/ItemCard";
import { VECTORS } from "../../styles/vectors";





export const Characters = props => {
	const {actions, store} = useContext(Context);
	

	const inputSearch = useRef(null);
	const [textSearch, setTextSearch] = useState('');


  
	const [people, setPeople] = useState([]); 
	const [currentCharacter, setCurrentCharacter] = useState(1);
	const [details, setDetails] = useState({});
  
	const [page, setPage] = useState(1);
  
	const [errorState, setErrorState] = useState({HasError: false});
   
	useEffect(() => {
	  getPeople(page).then(setPeople).catch(handleError);
	}, [page]);
  
	useEffect (() => {
	  getCharacter(currentCharacter).then(setDetails).catch(handleError);
	}, [currentCharacter]);
  
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
	  searchCharacter(textSearch).then(setPeople).catch(handleError);
  
	}
  
	const onChangePage = (next) => {
	  if (!people.previous && page + next <= 0) {
		return;
	  }
	  if (!people.next && page + next > 9) {
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
						placeholder='Search for a character'
						onKeyDown={onSearchSubmit}
						></input>
					</div>
						<div className="StarWarsSectionTitle"><h2>Characters</h2></div>
						<div className="StarWarsSectionNav">
								<button className="StarWarsNavButton" onClick={() => onChangePage(-1)}>{VECTORS.prev}</button>
	  							<span> Current page: {page} </span>
	 							 {page < 9 ? <button className="StarWarsNavButton"onClick={() => onChangePage(+1)}>{VECTORS.next}</button>: <button className="StarWarsNavButton" onClick={() => setPage(1)}>{VECTORS.prev}{VECTORS.prev}</button>}
						</div>
						
	 		 	</div>
				<div className='StarWarsSectionContainer'>
					
					{errorState.HasError && <div>{errorState.message}</div>}
					{people?.results?.map((character) => (
						<>

							<ItemCard 
							key={character.name}
							itemUrlId={Number(character.url.split('/').slice(-2)[0])}
							itemUrlGroupId={character.url.split('/').slice(-3)[0]}
							itemUrl={true}
							itemName={character.name}
							itemImg={`https://starwars-visualguide.com/assets/img/characters/`+Number(character.url.split('/').slice(-2)[0])+'.jpg'}
							/>

					</> 
					))}
			
				</div>
	</div>
	</>
	);
};


