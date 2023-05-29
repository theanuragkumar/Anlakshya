import React from 'react'
import "./single.css"
import SinglePost from '../SinglePost/SinglePost';
import LatestPost from '../Components/LatestPost/LatestPost';
import Footer from '../Footer/Footer';
// import Contact from '../Contact/Contact';
import Comment from '../Components/Comment/Comment';
import Ads from '../Components/Ads/Ads';
// import Ads01 from '../Components/Ads/Ads01';
function Single(props) {
  
  return (<>
    <div className='container'>
      <div className='row'>
        <div className='col-9'>
          <SinglePost setProgress={props.setProgress}></SinglePost>
          <div className='mediumAds'>
            <Ads></Ads>
          </div>
          <div className='mediumAds mt-2'>
            <Ads></Ads>
          </div>
        </div>
        <div className='col-3'>
          <div>
            <LatestPost />
            <div className='smallAds'>
              <Ads></Ads>
            </div>
          </div>
          <div className='mt-4'>
            <Comment />
            <div className='smallAds mt-2'>
              <Ads></Ads>
            </div>
            <div className='smallAds mt-2'>
              <Ads></Ads>
            </div>
            <div className='smallAds mt-2'>
              <Ads></Ads>
            </div>
            <div className='smallAds mt-2'>
              <Ads></Ads>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className='largeAds'>
      <Ads></Ads>
      {/* <Ads01></Ads01> */}
    </div>
    <Footer />
  </>
  )
}

export default Single