import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt=""/>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora nihil nemo nobis eum aliquid, quisquam cupiditate nam sunt voluptatibus nesciunt qui error velit consectetur dicta laborum, at numquam sit a.</p>
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon} alt=""/>
                    <img src={assets.linkedin_icon} alt=""/>
                    <img src={assets.twitter_icon} alt=""/>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>Address: 103B Goodwill Pg, Kadubeeshanahalli, Bengaluru 560103</li>
                    <li>Phone: +919335927595</li>
                    <li>Email: adarsh2218diwakar@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2025 @ Tomato.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
