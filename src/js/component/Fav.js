import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "../../styles/Favs.css"
import { VECTORS } from '../../styles/vectors'
import { Context } from '../store/appContext'

function Fav({ itemName, itemUrl, id, itemId, itemNumber}) {
  const {actions} = useContext(Context);
  
  return (
    <div id={id} className="FavContainer">
        <div><Link className="FavLink"to={itemUrl}>
          <div><img className='FavImg' src={itemUrl.includes('people')?`https://starwars-visualguide.com/assets/img/characters/${itemNumber}.jpg`:`https://starwars-visualguide.com/assets/img/${itemUrl}.jpg`} width="50px" height="50px"/>
          {itemName}
          </div>
          </Link></div>
        <div className='BtnGroup'>
         <button onClick={() => actions.removeFav(itemId, itemName)}  className='DeleteFav'>{VECTORS.delete}</button>
         </div>        
    </div>
  )
}

export default Fav