import React, { useContext } from "react";
import { getPlanet, getPlanets, searchPlanet } from '../../api/planets.js';
import { useState, useEffect, useRef } from "react";
import "../../styles/home.css";
import "../../styles/index.css"
import Countdown from "../component/Countdown.js";
import HomeCarousel from "../component/HomeCarousel.js";
import { Context } from "../store/appContext.js";
import ItemCard from "../component/ItemCard.js";

function Home () {
	const {store} = useContext(Context)

	return (
		
	<div className="StarWarsSectionMainContainer"> 
		<div className="CountdownContainer">
		<div><span>Days till the next Star Wars's Day</span></div>
		<div><Countdown date="2023-05-04T00:00:00"/></div>
		</div>
		<HomeCarousel />
		<div className={store?.favs?.length>0? "HomeFavTitle":"HomeFavTitleHidden"}><h1>Saved Items</h1></div>
		<div className="StarWarsFavsContainer">
		
		
		{store.favs.map(e => 
		<ItemCard 
		itemUrlGroupId={e.itemUrlGroupId} 
		itemUrlId={e.itemUrlId} 
		itemUrl={e.itemUrl}
		itemName={e.name} 
		itemImg={e.itemUrl.includes('people')?`https://starwars-visualguide.com/assets/img/characters/${e.itemNumber}.jpg`:`https://starwars-visualguide.com/assets/img/${e.itemUrl}.jpg`}
		
		/>)}
		
		</div>
	</div>
	
	)
  
	
  }


export default Home;