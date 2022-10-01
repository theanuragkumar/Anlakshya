import React from 'react'
import Contact from '../../Contact/Contact'
import Sidebar from '../../Sidebar/Sidebar'
import { useEffect } from 'react';
import Ads from '../Ads/Ads';
import Footer from '../../Footer/Footer';
import "./about.css";
import LatestPost from "../LatestPost/LatestPost"
import Privacy from "../PrivacyPolicy/Privacy";
import TermsAndCondition from "../TermsAndCondition/TermsAndCondition";
import RefundAndReturn from "../RefundAndReturn/RefundAndReturn";

function About(props) {

    let page=props.page;

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});  // To scroll to the Top of window
        document.title = `${page.charAt(0).toUpperCase() + page.slice(1)} - Anlakshya`;
    }, [page])
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-8'>
                        {page === "about" && <Sidebar />}
                        {page === "privacy" && <Privacy />}
                        {page === "terms" && <TermsAndCondition />}
                        {page === "refund" && <RefundAndReturn />}
                        <div className='smallAds mt-3'>
                            <Ads></Ads>
                        </div>
                        {page === "about" && 
                            <div className='smallAds mt-3'>
                                <Ads></Ads>
                            </div>
                        }
                    </div>
                    <div className='col-4'>
                        <LatestPost/>
                        <div className='smallAds mt-3'>
                            <Ads />
                        </div>
                        <Contact />
                        <div className='smallAds mt-3'>
                            <Ads></Ads>
                        </div>
                    </div>
                </div>
            </div>
            <div className='largeAds'>
                <Ads />
            </div>
            
            <Footer />
        </>
    )
}

export default About