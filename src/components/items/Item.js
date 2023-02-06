import React from "react";
import classes from './Item.module.css'
import {Link} from 'react-router-dom'

const Item = ({item}) => {
    return(
        <div key={item.id} className='shadow'>
            <div className={classes.photo}>
                <img src={item.photo[0]}></img>
            </div>
            <Link to={`/sanpham/masanpham/${item.id}`}> 
                <p className="textCenter"> 
                    {item.name}
                </p>
            </Link>
            <p className="textCenter">
                {item.price}
            </p>
        </div>
    )
}

export default Item