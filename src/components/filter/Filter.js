import React, { useState } from "react";
import classes from './Filter.module.css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Link } from "react-router-dom";

const Filter = ({path}) => {
    const [category, setCategory] = useState([])
    const [filteredPrice, setFilteredPrice] = useState('')
    const priceHandler = (e) => {
        setFilteredPrice(e.target.value)
    }
    const categoryHandler = (e) => {
        const {value,checked} = e.target;
        if(checked){
            setCategory(category.concat(value))
        }
        else{
            setCategory(category.filter(c => c!==value))
        }
    }

    // const navigate = useNavigate();
    // const filterHandler = useCallback(() => navigate(`/search/${input}/${filteredPrice}`, {replace: true}), [navigate])
    return(
        <div className={classes.filter}>
            {/* <div className={classes["filter-header"]}>
                <FilterAltOutlinedIcon className="primary" sx={{fontSize: 50}}></FilterAltOutlinedIcon>
                <span> Lọc </span>
            </div> */}
            <form >
                <label for="category"> <b> Chọn loại hàng </b> </label><br></br>
                <input type="checkbox" id="category1" value="0" name="category1" onChange={categoryHandler}></input>
                <label for="top"> Áo </label><br></br>
                <input type="checkbox" id="category2" value="1" name="category2" onChange={categoryHandler}></input>
                <label for="bottom"> Quần </label><br></br>
                <input type="checkbox" id="category3" value="2" name="category3" onChange={categoryHandler}></input>
                <label for="acessory"> Phụ kiện</label><br></br>
                <label for="price"> <b> Chọn khoảng giá </b> </label><br></br>
                <input type="radio" id="priceRange1" name="priceRange" value="<500000" onChange={priceHandler}></input>
                <label for="priceRange1"> {`<500.000`} </label><br></br>
                <input type="radio" id="priceRange2" name="priceRange" value=">=500000" onChange={priceHandler}></input>
                <label for="priceRange2"> {`>=500.000`} </label><br></br>
                <Link to={`/${path}/${category}/${filteredPrice}`}><button className="primary"> Lọc </button> </Link>
            </form>
        </div>
    )
}
export default Filter