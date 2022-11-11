import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../../styles/header.css";
import { Context } from "../store/appContext";
import Fav from './Fav';
import { VECTORS } from '../../styles/vectors';


function header() {



const {store, actions} = useContext(Context);
const sectionUrlPrefix = '/characters/';
  return (
    <div className='sticky-top'>
        <div className='StarHeaderMS'>
            <Link className='LogoLink' to="/">
            <div className='StarLogoMS'>
                <h1 className='StarTitleMS'>Star</h1>
                <h1 className='StarTitleMS'>Wars</h1>
            </div>
            </Link>
                <nav className="navbar navbar-expand-lg StarBarMS container" >
                        <div className="container">
                          
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <div className='StarButtonsMS'>
                                    <div>
                                    <Link to="/people">
                                        <button className='NavButtonJediMS'>Characters</button>
                                    </Link>
                                    </div>
                                    <div>
                                    <Link to="/planets">
                                         <button className='NavButtonSithMS'>Planets</button>
                                    </Link>
                                    </div>
                                    <Link to="/vehicles">
                                        <button className='NavButtonJediMS'>Vehicles</button>
                                    </Link>                             
                                    <div>
                                    <Link to="/species">
                                        <button className='NavButtonSithMS'>Species</button>
                                    </Link>
                                    </div>
                                    <div>
                                    <Link to="/starships">
                                        <button className='NavButtonJediMS'>Spaceships</button>
                                    </Link>
                                    </div>
                                    <div>
                                    <Link to="/films">
                                        <button className='NavButtonSithMS'> Films</button>
                                    </Link>
                                    </div>
                                    <div>
                                    <div className="dropdown">
                                        <button className="NavButtonFavsMS" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            Read Later 
                                        </button>
                                        <label htmlFor="dropdownMenuButton1" className={store.names.length > 0?"FavsCounter2":"FavsCounter"}>{store.names.length}</label>
                                        <ul className="dropdown-menu FavsMenu" aria-labelledby="dropdownMenuButton1">
                                        {store?.favs?.map( e => (
                                            <li>
                                            <Fav key ={e.id}itemNumber={e.itemNumber}id={e.id} itemId={e.id} itemName={e.name} itemUrl={e.itemUrl}/> 
                                            </li>
                                            ))}
                                        </ul>
                                    </div>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                 </nav>

        </div>


    </div>
  )
}

export default header