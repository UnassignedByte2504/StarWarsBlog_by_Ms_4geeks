import React, { useContext } from 'react'
import "../../styles/ItemDetail.css"

import { useState } from 'react';
import { Context } from '../store/appContext';

function ItemDetail({itemImg, itemName, key1, value1, key2, value2, key3, value3, key4, value4, key5, value5, key6, value6, WikiSite, WikiUrl, wikiDisplay, key7, value7, itemId, groupId}) {
const {actions, store} = useContext(Context);


  return (
   <div className='ItemContainer container'>
    <div className='ItemImg'>
        <img src={itemImg}/> 
    </div>
    <div className='ItemDetails'>
        <div className='ItemTitle'><h3>{itemName}</h3></div>
        <div><span className="ItemPropTag">{key1}</span><span className='ItemPropValue'>{value1}</span></div>
        <div><span className="ItemPropTag">{key2}</span><span className='ItemPropValue'>{value2}</span></div>
        <div><span className="ItemPropTag">{key3}</span><span className='ItemPropValue'>{value3}</span></div>
        <div><span className="ItemPropTag">{key4}</span><span className='ItemPropValue'>{value4}</span></div>
        <div><span className="ItemPropTag">{key5}</span><span className='ItemPropValue'>{value5}</span></div>
        <div><span className="ItemPropTag">{key6}</span><span className='ItemPropValue'>{value6}</span></div>
        <div><span className="ItemPropTag">{key7}</span><span className='ItemPropValue'>{value7}</span></div>
        <div><span className="ItemPropTag">{WikiSite}</span><span className='ItemPropValue'><a className='WikiLink' href={WikiUrl}>{wikiDisplay}</a></span></div>  
        </div>
   </div>
  )
}

export default ItemDetail