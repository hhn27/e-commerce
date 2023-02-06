import React from "react";
import classes from './Footer.module.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return(
        <div className={classes.footer}>
            <div className={classes.container}>
                <div>
                    <h3> Giới thiệu </h3>
                    <p> Về chúng tôi </p>
                    <p> Sản phẩm </p>
                    <p> Khuyến mãi </p>
                </div>
                <div>
                    <h3> Điều khoản </h3>
                    <p> Điều khoản sử dụng </p>
                    <p> Quy tắc bảo mật </p>
                </div>
                <div>
                    <h3> Kết nối với chúng tôi </h3>
                    <FacebookIcon className={classes.facebook}></FacebookIcon>
                    <InstagramIcon className={classes.instagram}></InstagramIcon>
                </div>
            </div>
        </div>
    )
}
export default Footer;