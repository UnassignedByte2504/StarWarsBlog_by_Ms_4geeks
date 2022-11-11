import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import  Home  from "./views/home";

import { Character } from "./views/Character";
import { Characters } from "./views/characters";

import { Planet } from "./views/planet";
import { Planets } from "./views/planets";

import { Vehicles } from "./views/vehicles";
import { Vehicle } from "./views/vehicle";

import { Spaceships } from "./views/spaceships";
import { Spaceship } from "./views/spaceship";

import { Species } from "./views/species";
import { Specie } from "./views/specie";

import { Film } from "./views/film";
import { Films } from "./views/films";

import injectContext from "./store/appContext";

import Header from "./component/header";

//create your first component

const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
					<Header />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/people">
							<Characters />
						</Route>
						<Route exact path="/people/:CharacterId">
							<Character />
						</Route>
						<Route exact path="/planets">
							<Planets />
						</Route>
						<Route exact path="/planets/:PlanetId">
							<Planet />
						</Route>
						<Route exact path="/vehicles">
							<Vehicles />
						</Route>
						<Route exact path="/vehicles/:VehicleId">
							<Vehicle />
						</Route>
						<Route exact path="/species">
							<Species />
						</Route>
						<Route exact path="/species/:SpecieId">
							<Specie />
						</Route>
						<Route exact path="/starships">
							<Spaceships />
						</Route>
						<Route exact path="/starships/:SpaceshipId">
							<Spaceship />
						</Route>
						<Route exact path="/films">
							<Films />
						</Route>
						<Route exact path="/films/:filmId">
							<Film />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
