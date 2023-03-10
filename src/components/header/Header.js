import React, {useState, useEffect, useRef, useCallback} from "react";
import logo from '../../assets/PIGAC2.png';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import classes from './Header.module.css';
import itemCategories from "../../data/CategoriesData";
import { Link, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { green } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import { useGlobalContext } from "../../context";
import { auth } from "../../firebase-config";
import {signOut} from 'firebase/auth'
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
    const {cartDisplay} = useGlobalContext() 
    const color=green[500];
    const [linkActive, setLinkActive] = useState(0);
    const handelLinkClick = (linkIndex) => {
      setLinkActive(linkIndex);
      if(sidebarIsOpen)
        setSidebarIsOpen(!sidebarIsOpen)
    }
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [searchBarStyle, setSeachBarStyle] = useState({display: 'none'});
    const openSidebar = () => {
      setSidebarIsOpen(sidebarIsOpen => !sidebarIsOpen);
    }
    const openSearchBar = () => {
      setSeachBarStyle({display: 'block'})
    }
    const closeSeachBar = () => {
      setSeachBarStyle({display: 'none'})
    }
    const linksRef = React.useRef();
    useEffect(() => {
      if(sidebarIsOpen===true){
        linksRef.current.style.transform = "translateX(0)";
      }
      else{
        linksRef.current.style.transform = "translateX(-100%)";
      }
    }, [sidebarIsOpen]);
    const colors = "rgb(124, 124, 124)"

    const navigate = useNavigate();
    const searchRef = useRef('')
    const searchMobileRef = useRef('')
    const searchHandler = (e, i) => {
      e.preventDefault()
      navigate(`/search/${i}`, {replace: false})
    }
    const {amount, user} = useGlobalContext()
    
    const signOutHandler = async () => {
      await signOut(auth)
      navigate('/', {replace:true})
      cartDisplay([])
    }

    return(
      <div className={classes.relative}>
        <nav className={classes.header}>
            <div>
              <Link to="/" onClick={() => handelLinkClick(1)}> <img className={classes.logo} src={logo} alt='logo'></img> </Link>
            </div>
            <form className={classes.form} onSubmit={(e) => searchHandler(e, searchRef.current.value)}>
              <input className="shadow" type="text" id="search" name="search" ref={searchRef}></input>
              <button> <SearchIcon sx={{color: colors, fontSize: 30}}></SearchIcon> </button>
            </form>
            <div> <button className={classes.seachBtn} onClick={openSearchBar}> <SearchIcon sx={{color: colors, fontSize: 30}}></SearchIcon> </button> </div>
            <div className={classes['search-mobile']} style={searchBarStyle}>
              <div className={classes['search-flex']}>
                      <button onClick={closeSeachBar}> <CloseIcon sx={{color: colors, fontSize: 30}}> </CloseIcon> </button>
                      <form onSubmit={(e) => searchHandler(e, searchMobileRef.current.value)}>
                        <input className="shadow" type="text" id="search" name="search" ref={searchMobileRef}></input>
                        <button> <SearchIcon sx={{color: colors, fontSize: 30}}></SearchIcon> </button>
                      </form>
              </div>
            </div>
            <div> <button className={classes.toggleBtn} onClick={openSidebar} > <HorizontalSplitIcon sx={{fontSize: 30}}></HorizontalSplitIcon> </button> </div>
            <ul className={classes.navLinks} ref={linksRef}>
              <li>
                <Link to="/gioithieu" className={linkActive===2 ? classes.active : null} onClick={() => handelLinkClick(2)}> Gi???i thi???u </Link>
              </li>
              <li className={classes.items}>
                <Link to="/sanpham" className={linkActive===3 ? classes.active : null} onClick={() => handelLinkClick(3)}> S???n ph???m </Link>
                <article className={classes.itemCategories}>
                  {itemCategories.map((itemCategory) => {
                    return(
                        <div key={itemCategory.id}>
                            <Link to={`/sanpham/${itemCategory.id}`} > <p> {itemCategory.name} </p> </Link>
                        </div>
                    );
                  })}
                </article> 
              </li>
              <li>
                {user? <Link to="/dangxuat" className={linkActive===4 ? classes.active : null} onClick={signOutHandler}> ????ng xu???t </Link>:
                        <Link to="/dangnhap" className={linkActive===4 ? classes.active : null} onClick={() => handelLinkClick(4)}> ????ng nh???p </Link> 
                }
              </li>
            </ul>
            <ul className={classes.navLinksMobile} ref={linksRef}>
              <li>
                  <Link to="/gioithieu" className={linkActive===2 ? classes.active : null} onClick={() => handelLinkClick(2)}> Gi???i thi???u </Link>
                </li>
              <li className={classes.items}>
                <Link to="/sanpham" className={linkActive===3 ? classes.active : null} onClick={() => handelLinkClick(3)}> S???n ph???m </Link>
                
              </li>
              <li>
                <Link to="/dangnhap" className={linkActive===4 ? classes.active : null} onClick={() => handelLinkClick(4)}> ????ng nh???p </Link>
              </li>
            </ul>
          
            <div>
              <Link to="/giohang" onClick={() => handelLinkClick(5)}> 
                <Badge badgeContent={amount} sx={{
                                              "& .MuiBadge-badge": {
                                                color: "white",
                                                backgroundColor: color,
                                              }
                                            }}>
                    <ShoppingCartIcon className='li-cart' sx={{ color: "white", stroke: color, strokeWidth: 1, fontSize: 30}} />
                </Badge> 
              </Link>
            </div>
          
        </nav> 
        </div>
    )
}

export default Header;