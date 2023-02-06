import React, {useState} from "react"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Item from "../items/Item";
import classes from './ItemsSlider.module.css'

const ItemsSlider = ({items}) => {
    const fItemsRef = React.useRef();
    const fItemRef = React.useRef();
    const [index, setIndex] = useState(0)
    const [style,setStyle] = useState({})
    const fItemsHandleRightClick = () => {
        let newIndex= index+1;
        if(newIndex>( items.length- fItemsRef.current.offsetWidth/fItemRef.current.offsetWidth)){
            newIndex=items.length - Math.floor(fItemsRef.current.offsetWidth/fItemRef.current.offsetWidth);
        }
        setIndex(newIndex);
        setStyle({transform: `translateX(-${newIndex*(fItemRef.current.offsetWidth+fItemsRef.current.offsetWidth/100)}px)`,transition: 'transform 400ms'});
    }
    const fItemsHandleLeftClick = () => {
        let newIndex= index-1;
        if(newIndex<0){
            newIndex=0;
        }
        setIndex(newIndex);
        setStyle({transform: `translateX(-${newIndex*(fItemRef.current.offsetWidth+fItemsRef.current.offsetWidth/100)}px)`, transition: 'transform 400ms'}  );
    }

    return(
        <div className={classes['items-slider-relative']} ref={fItemsRef}>
            <div className={classes['items-slider-wrapper']}>
                <div className={classes.items} style={style}>
                {items.map((item) =>
                    <div ref={fItemRef}>
                        <Item item={item}>
                        </Item>
                    </div>
                )}
                </div>
            </div>
            <ArrowBackIosIcon className={classes['arrow-back']} onClick={fItemsHandleLeftClick}></ArrowBackIosIcon>
            <ArrowForwardIosIcon className={classes['arrow-forward']} onClick={fItemsHandleRightClick}></ArrowForwardIosIcon>
        </div>
    )
}
export default ItemsSlider