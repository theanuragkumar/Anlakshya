import React from 'react'
import "./posts.css";
import Post from '../Post/post';

function Posts({ posts }) {

  return (<>
   
      <div className="container">
        <div className="row">
          {posts.map(p => (
            <div className="col-md-4 mb-4" key={p._id}>
              <Post post={p} key={p._id} />
            </div>
          ))}
        </div>
      </div>
    </>
    )
}

    export default Posts