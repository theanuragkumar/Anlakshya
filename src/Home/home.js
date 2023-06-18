import { useEffect, useState } from 'react';
import "./home.css";
import Header from '../Header/header';
import Posts from '../Posts/posts';
import Sidebar from '../Sidebar/sidebar';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import Contact from '../Contact/Contact';
import Ads from '../Components/Ads/Ads';
// import Ads01 from '../Components/Ads/Ads01';

function Home(props) {
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(true);
  var { search } = useLocation();
  search = search.replace('?', '&')
  // API CALL for ALL Category   
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });  // To scroll to the Top of window
      const res = await axios.get("https://api-anlakshya.onrender.com/api/categories/");
      setCats(res.data);
    }
    getCats();
  }, [])


  useEffect(() => {
    document.title = 'Home - Anlakshya';
    props.setProgress(10);
    const fetchPosts = async () => {
      setLoad(true);
      props.setProgress(70);
      const API_KEY = process.env.REACT_APP_API_KEY
      
      const res = await axios.get("https://api-anlakshya.onrender.com/api/posts/latest?api="+API_KEY + search);
      setPosts(res.data);
      setLoad(false);
      props.setProgress(100);
    }
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <div className='homepage'>
      <Header></Header>

      <div className='postsContainer'>
        <h1 className="LatestPostTitle">{search.substring(search.indexOf('=') + 1).toUpperCase()} LATEST POSTS  </h1>
        <hr></hr>
        <div className="dropdown">
          <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            {search ? (search.substring(search.indexOf('=') + 1).toUpperCase()) : "Latest Posts"}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <Link className="dropdown-item" to={`/`}> LATEST POSTS </Link>
            {cats.map((c) => (
              <li key={c._id}> <Link className="dropdown-item" to={`/?cat=${c.name}`}>
                {c.name.toUpperCase()}
              </Link>
              </li>

            ))}
          </ul>

        </div>
      </div>

      <div className='home' >
        {
          load ? <div className="spinner-border text-primary loadingIcon" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
            :
            <Posts posts={posts} ></Posts>
        }

      </div>
      <div className='mediumAds'>
        <Ads></Ads>
      </div>
      <div className='container'>
        <div className='row'>

          <div className='col-8'>
            <Sidebar />
            <div className='mediumAds'>
              <Ads></Ads>
            </div>
          </div>
          <div className='col-4'>
            <Contact />
            <div className='smallAds'>
              <Ads></Ads>
            </div>
            <div className='smallAds mt-2'>
              <Ads></Ads>
            </div>
          </div>
        </div>

      </div>
      <div className='largeAds'>
        <Ads></Ads>
        {/* <Ads01></Ads01> */}
      </div>
      <Footer />
    </div>
  )
}

export default Home