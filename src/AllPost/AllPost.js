import { useEffect, useState } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Post from '../Post/post';
import Sidebar from '../Sidebar/sidebar';
import "./AllPost.css";
import Contact from '../Contact/Contact';
import Ads from '../Components/Ads/Ads01';

function AllPost(props) {

    const [load, setLoad] = useState(true);
    const[postSize, setpostSize] =useState();
    const [page, setPage] = useState(1);

    // API CALL for ALL Post
    const [posts, setPosts] = useState([]);
    var { search } = useLocation();
    search = search.replace('?', '&')

    useEffect(() => {
        props.setProgress(10);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });  // To scroll to the Top of window
        const fetchPosts = async () => {
            var categoryTitle = search.substring(search.indexOf('=') + 1)
            document.title = categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1) + ' Posts - Anlakshya';
            setLoad(true);
            props.setProgress(30);
            const API_KEY= process.env.REACT_APP_API_KEY
            const res = await axios.get("https://api-anlakshya.onrender.com/api/posts?pageNo=1&api="+API_KEY+search);
            setpostSize(res.data.length);
            props.setProgress(70);
            setPosts(res.data);
            setLoad(false);
            props.setProgress(100);
        }
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    useEffect(() => {
        props.setProgress(10);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });  // To scroll to the Top of window
        const fetchPosts = async () => {          
            setLoad(true);
            props.setProgress(30);
            const API_KEY= process.env.REACT_APP_API_KEY
            const res = await axios.get("https://api-anlakshya.onrender.com/api/posts?pageNo=" + page+"&api="+API_KEY+ search);
            setpostSize(res.data.length);
            props.setProgress(70);
            setPosts(res.data);
            setLoad(false);
            props.setProgress(100);
        }
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
    
    return (
        <>
            <div className='postsContainer'>
                {
                    search.startsWith("&user=") ? <h1 className="AllPostTitle">POSTS {search && "CREATED BY"} {search.substring(search.indexOf('=') + 1).toUpperCase()}  </h1> :
                        <h1 className="AllPostTitle">{!search && "ALL"} {search.substring(search.indexOf('=') + 1).toUpperCase()} {search && search !== "?cat=other" ? "RELATED" : ""} POSTS </h1>
                }
                <hr></hr>

                <div className="container">
                    <div className="row">
                        {load ? <div className="spinner-border text-primary loadingIcon" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                            :
                            postSize===0 ? <div class="alert alert-dark" role="alert">
                            <b>No Post Available at Page {page}, please go back to Previous page</b>
                          </div>
                            :
                            posts.map(p => (
                                <div className="col-md-4 mb-4" key={p._id} >
                                    <Post post={p} key={p._id} />
                                </div>
                            ))}
                    </div>
                </div>

                
                <nav aria-label="Page navigation" >
                    <ul className="pagination">
                        <li className="page-item"><span className="page-link" onClick={() => {
                            if (page !== 1) {
                                setPage(page - 1)
                            }
                        }}> Previous</span></li>
                        <li className="page-item"><span className="page-link" onClick={() => setPage(1)}>1</span></li>
                        <li className="page-item"><span className="page-link" onClick={() => setPage(2)}>2</span></li>
                        <li className="page-item"><span className="page-link" onClick={() => setPage(3)}>3</span></li>
                        <li className="page-item"><span className="page-link" onClick={() => {
                            if(postSize!==0){
                                setPage(page + 1)
                            }                           
                        }}
                            >Next </span></li>
                    </ul>
                </nav>
            </div>
            <div className='mediumAds'>
                <Ads></Ads>
            </div>
            <div className='container'>
                <div className='row'>

                    <div className='col-8'>
                        <Sidebar />
                        <div className='smallAds'>
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
            <Footer></Footer>
        </>

    )
}

export default AllPost