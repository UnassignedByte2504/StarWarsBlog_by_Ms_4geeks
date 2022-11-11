import react from "react";
import { stringify } from "query-string";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			names:[],
			favs:[],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			addName:(nombre)=>{
				const store = getStore();
				const namesactuales= store.names;
				const nuevofav = {
					name:nombre,
				}
				const nuevosnombres =[nuevofav, ...namesactuales];
				setStore({names:nuevosnombres});
			},
			addFav: (itemName, itemUrlGroupId, itemUrlId, itemUrl) =>{
				const store = getStore();
				const currentFavs = store.favs;
				const currentNames = store.names;
				const id = Math.floor(Math.random() * 65535);
				const newName=[itemName,...currentNames];
				const newurl= `/${itemUrlGroupId}/${itemUrlId}`;
				itemUrl = newurl;
				const newFav = {
					name: itemName,
					itemUrl: itemUrl,
					itemUrlGroupId:itemUrlGroupId,
					itemUrlId:itemUrlId,
					id: id,
					itemNumber:itemUrlId,
					state:true
							 }
				if (!store.names.includes(itemName)){
				const addFav = [newFav, ...currentFavs];

				setStore({favs: addFav, names:newName});
			}else {
				const nameToRemove= itemName;
				const currentFavs = store.favs;
				const removeFav= [...currentFavs].filter(fav => fav.name !== nameToRemove)
				const currentNames= store.names;
				const removeName= [...currentNames].filter(name => name !== nameToRemove)

				setStore({favs:removeFav, names:removeName})
			}
			
			},
			removeFav: (itemId, itemName) =>{
				const store = getStore()
				const id = itemId;
				const nameToRemove= itemName;
				const currentFavs = store.favs;
				const removeFav= [...currentFavs].filter(fav => fav.id !== id)
				const currentNames= store.names;
				const removeName= [...currentNames].filter(name => name !== nameToRemove)

				setStore({favs:removeFav, names:removeName})
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},		

			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
