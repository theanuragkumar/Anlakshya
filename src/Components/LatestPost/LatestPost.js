import {React,useEffect, useState } from 'react'
import axios from "axios";
import  "./LatestPost.css";
import { Link  } from 'react-router-dom';

function LatestPost() {

    const [posts, setPosts] = useState([]);
 
    useEffect(() => {
      const fetchPosts = async () => {       
        const res = await axios.get("https://api-anlakshya.azurewebsites.net/api/posts/latest");
        setPosts(res.data);
      }
      fetchPosts();
    }, [])

  return (
    <ul className='latestPostLinks'>   
    <h3 className='latestPostTitle'>Latest Posts</h3>
    {posts.map((post) => (              
          <div className='latestPostHeading'key={post._id}>                 
              <li ><Link to={`/post/${post._id}`} style={{textDecoration:"none" ,color :"red"}}>
              {post.title}</Link></li>
              </div>   
    ))}       
    </ul>
  )
}

export default LatestPost