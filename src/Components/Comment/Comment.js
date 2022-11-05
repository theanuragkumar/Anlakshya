import { React, useState, useEffect } from 'react'
import "./Comment.css";
import { useLocation } from 'react-router-dom'
import axios from 'axios';

function Comment() {
    const [alert, setAlert] = useState(false);
    const [name, setName] = useState("");
    const [comment, setcomment] = useState([]);
    const [comments, setcomments] = useState([]);
    const [ButtonEnable, setButtonEnable] = useState(false);



    // To Fetch the Post_ID from the Url
    const location = useLocation();
    const path = location.pathname.split("/")[2];

    const getComment = async () => {
        const API_KEY= process.env.REACT_APP_API_KEY
        const res = await axios.get("https://api-anlakshya.onrender.com/api/comments/" + path)+"?api="+API_KEY;
        setcomments(res.data);

    }
    useEffect(() => {

        getComment();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path])

    async function addComment(e) {
        setButtonEnable(true);
        setAlert(true);
        e.preventDefault();
        const API_KEY= process.env.REACT_APP_API_KEY
        const res = await axios.post('https://api-anlakshya.onrender.com/api/comments/?api='+API_KEY,
            {
                createdBy: name,
                comment,
                postId: path
            }
        );
        if (res.status === 200) {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 3000);

            setName("");
            setcomment("");
            getComment();
            setButtonEnable(false);
        }
        else {
            alert(res.status);
        }
    }

    return (<>
        <div className='showComment'>
            <span className="commentHeading">Comments</span>
            <br></br>
            {comments.length < 1 ? <b>No Comments to Display</b> :
                comments.map(c => (
                    <div key={c._id}>
                        <span className='name'>{c.createdBy}</span>
                        {localStorage.getItem("auth-token") && localStorage.getItem("user") && <div className="singlePostEdit">
                            <i className="singlePostIcon fa-solid fa-trash" onClick={async () => {
                                await axios.delete("https://api-anlakshya.onrender.com/api/comments/" + c._id);
                                getComment();
                            }}></i>
                        </div>}
                        <p className='comments'>{c.comment}</p>
                    </div>
                ))
            }

        </div>



        <div className='comment'>
            <span className="commentTitle">Add Comment</span>
            {
                alert && <div className="alert alert-success mt-3" width="100" role="alert">
                    Comment added Successfully...
                </div>
            }
            <form className="commentForm" onSubmit={addComment}>
                <label>Name</label>
                <input type="text" value={name} className="commentInput" placeholder='Enter Your Name...' name='from_name' onChange={e => setName(e.target.value)} required />
                <label>Comment</label>
                <textarea type="text" value={comment} rows="4" cols="50" className=" commentInput" placeholder='Comment Here...' name='comment' onChange={e => setcomment(e.target.value)} required />
                <button className="commentButton" type='submit' disabled={ButtonEnable}>Add Comment</button>
            </form>
        </div>
    </>

    )
}

export default Comment