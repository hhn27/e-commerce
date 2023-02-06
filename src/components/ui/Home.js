import { ClassNames } from "@emotion/react";
import React, { useState,useEffect } from "react";
// import Items from "../items/Items";
import classes from "./Home.module.css";
import { useGlobalContext } from "../../context";
import collectionBanner1 from '../../assets/coll1.jpg'
import collectionBanner2 from '../../assets/coll2.jpg'
import collectionBanner3 from '../../assets/coll3.jpg'
import top from '../../assets/top.png'
import bottom from '../../assets/bottom.png'
import accessory from '../../assets/accessory.png'
import itemCategories from "../../data/CategoriesData";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import banner from '../../assets/banner.png'
import { Link } from "react-router-dom";
import Items from "../items/Items";
import ItemsSlider from "../items/ItemsSlider";
import Loading from "../loading/Loading";
import { useResizeDetector } from 'react-resize-detector'
import { style } from "@mui/system";
const Home =() =>{
    const {items, loading} = useGlobalContext()
    const [categoryActive, setCategoryActive] = useState(0)
    const [preCategoryActive, setPreCategoryActive] = useState(0)
    const itemsByCategoryHandler = (input) => {
        // preCategoryActive = categoryActive
        setPreCategoryActive(categoryActive)
        setCategoryActive(input)
        // console.log(preCategoryActive)
    }
    let itemsByCategory = items.filter((item)  => item.category===itemCategories[categoryActive].name)
    
    if (loading) {
        return (
          <Loading/>
        )
      }
    return(
        <>
        <img className={classes.banner} src={banner} alt='banner'></img>
        <div className={classes.home}>
            <div className={classes.collection}>
                <img src={collectionBanner2} alt='collection'></img>
                <div className={classes.collectionRightSide}>
                    <img src={collectionBanner1} className={classes.crs1} alt='collection'></img>
                    <img src={collectionBanner3} className={classes.crs2} alt='collection'></img>
                    <h2> Collection mới nhất đang được mở bán </h2>
                    <button className="primary"> Xem ngay </button>
                </div>
            </div>
            <div className={classes['featured-items-container']}> 
                <h2 > Sản phẩm nổi bật </h2>
                <ItemsSlider items={items}></ItemsSlider>
            </div>
            <div className={classes.categories}>
                <h2 className="textCenter"> Đa dạng cho việc lựa chọn </h2>
                <div className={classes.ab}>
                    <img src={top} alt='top'></img>
                    <img src={bottom} className={classes.bottom} alt='bottom'></img>
                    <img src={accessory} alt='accessory'></img>
                </div>
            </div>
            <div className={classes.itemsByCategory}>
                <div className={classes.categoriesList}>
                    <button className={categoryActive===0 ? classes.categoryActive : null} onClick={() => itemsByCategoryHandler(0)}> Áo </button>
                    <button className={categoryActive===1 ? classes.categoryActive : null} onClick={() =>itemsByCategoryHandler(1)}> Quần </button>
                    <button className={categoryActive===2 ? classes.categoryActive : null} onClick={() =>itemsByCategoryHandler(2)}> Phụ kiện </button>
                </div>
                <div className={classes.itemsByCategoryWrapper} > 
                <TransitionGroup childFactory={child => React.cloneElement(child, { classNames: preCategoryActive<categoryActive ? 
                    {enterActive: classes.nfadeEnter,
                        enterDone: classes.nfadeEnterActive,
                        exitActive: classes.nfadeExit,
                        exitDone: classes.nfadeExitActive} : {enterActive: classes.pfadeEnter,
                            enterDone: classes.pfadeEnterActive,
                            exitActive: classes.pfadeExit,
                            exitDone: classes.pfadeExitActive}
                    , timeout:500 })}>
                <CSSTransition key={categoryActive} timeout={500} >
                <div className={classes.itemsTransition}>
                    <ItemsSlider items={itemsByCategory}></ItemsSlider>
                </div>
                </CSSTransition>
                </TransitionGroup>
                </div> 
                
                <button className="primary"> Xem thêm </button>
            </div>
        </div>
        </>
    )
}
export default Home;