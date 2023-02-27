import React, {useEffect, useRef} from "react";
import { useGlobalContext } from "../../context";
import classes from './ItemsDisplay.module.css';
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Items from "../items/Items";
import Filter from "../filter/Filter";
import {CSSTransition} from 'react-transition-group'
import TuneIcon from '@mui/icons-material/Tune';

const ItemsDisplay = () => {
    const cat = ['Áo', 'Quần', 'Phụ kiện']
    const {category} = useParams()
    const {price} = useParams()
    const {items} = useGlobalContext()
    let itemsDisplay = items
    const [styles, setStyles] = useState({translate:'0'})
    if(category){
        const catList = category.split(',').map(Number);
        console.log(catList)
        itemsDisplay= []
        items.map((item) => {
            for(let i=0; i<catList.length;i++){
                if(item.category===cat[catList[i]])
                    itemsDisplay.push(item)
            }
        })
        // itemsDisplay = itemsDisplay.filter(item => item.category===cat[category] )
    }
    if(price){
        console.log(price)
        if(price==='<500000')
            itemsDisplay = itemsDisplay.filter(item => item.price<500000)
        else
            itemsDisplay = itemsDisplay.filter(item => item.price>=500000)
    }
    const [filterIsOpen, setFilterIsOpen] = useState(false)
    const filterHandler = () => {
        setFilterIsOpen(!filterIsOpen)
    }
    useEffect(() =>{
        if(filterIsOpen){
            setStyles({opacity: '1'})
        }
        else{
            setStyles({opacity: '0'})
        }
    },[filterIsOpen])

    return(
        <div className={classes["items-display"]}>
            <h2 className="textCenter"> Sản phẩm </h2>
            <div className={classes['filter-container']}>
                <button onClick={filterHandler} className={classes['filter-header']}>
                    <TuneIcon></TuneIcon>
                    <span><b> Lọc </b> </span>
                </button>
                <div className={classes['filter-relative']}>
                    <div className={classes['filter-transition']} style={styles}>
                        <Filter path= 'sanpham' ></Filter>
                    </div>
                </div>
            </div>
            <Items items={itemsDisplay}></Items>
        </div>
    )
}
export default ItemsDisplay