import React, { useState, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import classes from "./Search.module.css";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Filter from "../filter/Filter";
import Items from "../items/Items";
import TuneIcon from '@mui/icons-material/Tune';

const Search = () => {
    const cat = ['Áo', 'Quần', 'Phụ kiện']
    const {input} = useParams()
    const {category} = useParams()
    const {price} = useParams()
    const {items} = useGlobalContext()
    
    // const [filteredPrice, setFilteredPrice] = useState('')
    let searchedItems = items.filter(item => item.name.includes(input))
    if(category){
        const catList = category.split(',').map(Number);
        console.log(catList)
        const itemsDisplay= []
        searchedItems.map((item) => {
            for(let i=0; i<catList.length;i++){
                if(item.category===cat[catList[i]])
                    itemsDisplay.push(item)
            }
        })
        searchedItems=itemsDisplay
        // itemsDisplay = itemsDisplay.filter(item => item.category===cat[category] )
    }
    if(price){
        console.log(price)
        if(price==='<500000')
            searchedItems = searchedItems.filter(item => item.price<500000)
        else
            searchedItems = searchedItems.filter(item => item.price>=500000)
    }

    return(
        <div className={classes["search-container"]}>
            <h2> Kết quả tìm kiếm </h2>
            <div className={classes["search-grid"]}>
                <div>
                    <div className={classes['filter-header']}>
                        <TuneIcon></TuneIcon>
                        <span> <b> Lọc </b> </span>
                    </div>
                    <Filter path= {`search/${input}`}></Filter>
                </div>
                <Items items={searchedItems}></Items>
            </div>
        </div>
    )
}
export default Search