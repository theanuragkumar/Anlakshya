import React from 'react'
import "./posts.css";
import Post from '../Post/post';

function posts() {
  return (<>

    <div className='postsContainer'>
      <div className="postsTitle">Latest Posts </div>
    
      <div className="posts">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      
    </div>
    </>
  )
}

export default posts