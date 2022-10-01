import React from 'react'
import "./post.css"
import { Link } from "react-router-dom";
function Post({ post }) {
  const PF = "https://api-anlakshya.azurewebsites.net/images/"
  return (
    <div className='post'>
      {
        post.photo ?
          <img className='postImg' src={PF + post.photo}
            alt='anlakshya' /> : ""
      }
      
      <div className='postInfo'>
        <div className="postCats">
          <span className="postCat"> {post.categories}
          </span>
        </div>
        <Link to={`/post/${post._id}`} style={{ textDecoration: "none", color: "inherit" }}><h3 className='postTitle' >{post.title}</h3> </Link>
        <span className="postDate"> {new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className='postDesc' dangerouslySetInnerHTML={{ __html: post.desc.split(' ').slice(0, 40).join(' ') }} />
      <Link to={`/post/${post._id}`} style={{ textDecoration: "none" ,color:"red" }}><span>Read More...</span> </Link>
      

    </div>
  )
}

export default Post