import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import "../../styles/ItemCard.css"
import { Link } from 'react-router-dom';
import { VECTORS } from '../../styles/vectors';

function ItemCard({itemName, itemImg, keyName, itemUrlId, itemUrlGroupId, itemUrl, itemState}) {
  const {actions, store} = useContext(Context);
  

  itemUrl = `${itemUrlGroupId}/${itemUrlId}/`

  return (
    <>
   
 <div className='CardContainer card_small'>
    <div className='CardImg'>
        <img src={itemImg}/>
    </div>
    <div className='CardFooter'>
      <h5 className='ItemName'>{itemName}</h5>
      <div className='ItemCardBtnGroup'>
      <button className='StarWarsLearnMore'><Link className="SwLink" to={itemUrl}>Learn more</Link></button>
      <button className={store.names.includes(itemName) ? "StarWarsFavButtonOn": "StarWarsFavButtonOff"}onClick={() => actions.addFav(itemName, itemUrlGroupId, itemUrlId)}>{VECTORS.fav}</button>
     </div>
    </div>
    
 </div>
 </>
  )
}

export default ItemCard