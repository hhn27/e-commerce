import React, {useEffect, useState} from "react";
import classes from "./Items.module.css";
import { Link } from "react-router-dom";

const Items = ({items}) => {
    return(
        <div className={classes.items}>
                {items.map((item) =>{
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
            })}
        </div>
    )
}

export default Items;


