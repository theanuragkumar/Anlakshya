import axios from 'axios';
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import "./singlePost.css";
import { Context } from '../Context/Context';
import MetaTags from 'react-meta-tags';
import InarticleAds from '../Components/Ads/InarticleAds'


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function SinglePost(props) {

  // To Fetch the Post_ID from the Url
  const location = useLocation();
  const path = location.pathname.slice(-24);

  const [post, setPost] = useState({});

  const PF = "https://api-anlakshya.onrender.com/images/";


  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [link, setLink] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [description, setDescription] = useState("");
  const [load, setLoad] = useState(true);


  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });  // To scroll to the Top of window
    const getPost = async () => {
      setLoad(true);
      props.setProgress(20);
      const API_KEY = process.env.REACT_APP_API_KEY
      const res = await axios.get("https://api-anlakshya.onrender.com/api/posts/" + path+"?api="+API_KEY);

      // Set Title and description for Search Engine
      document.title = res.data.title;
      var div = document.createElement("div");
      div.innerHTML = res.data.desc;
      setDescription(div.innerText);
      document.querySelector('meta[name="description"]').setAttribute("content", div.innerText.split(' ').slice(0, 40).join(' '));

      props.setProgress(60);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setLink(res.data.link);
      setLinkTitle(res.data.linkTitle);
      props.setProgress(100);
      setLoad(false);
    }
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])


  const handleDelete = async () => {

    let authtoken = localStorage.getItem("auth-token");
    const headers = {
      "auth-token": authtoken,
    }
    const data = {
      username: user.username
    }

    try {
      await axios.delete("https://api-anlakshya.onrender.com/api/posts/" + path,
        { headers, data }
      );
      // TO redirect to Home page
      window.location.replace("/");

    } catch (err) {
      alert(err);
    }

  }


  const handleUpdate = async () => {
    try {
      setLoad(true);
      let authtoken = localStorage.getItem("auth-token");
      await axios.put("https://api-anlakshya.onrender.com/api/posts/" + path, {
        username: user.username,
        title: title,
        desc: desc,
        link: link,
        linkTitle: linkTitle
      },
        {
          headers: {
            "auth-token": authtoken
          }
        });
      setLoad(false);
      setUpdateMode(false);

    } catch (err) {
      alert(err);
    }

  }


  // Quill Editor Toolbar

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };



  return (
    <div className='singlePost'>
      <MetaTags>
        <title>{title}</title>
        <meta id="description" name="description" content={description.split(' ').slice(0, 40).join(' ')} />
        <meta id="og-title" property="og:title" content={title} />
        <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
        <link rel="canonical" href={`https://www.anlakshya.tech/post/${title.replace(/[^a-zA-Z0-9]+/ig, "-")}-${post._id}`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description.split(' ').slice(0, 40).join(' ')} />
        <meta property="og:url" content={`https://www.anlakshya.tech/post/${title.replace(/[^a-zA-Z0-9]+/ig, "-")}-${post._id}`} />
        <meta property="og:site_name" content="Anlakshya" />
        <meta property="article:author" content={post.username} />
        <meta property="article:tag" content={title} />
        <meta property="article:section" content={post.categories + " Tech Jobs"} />
        <meta property="og:updated_time" content={post.updatedAt} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description.split(' ').slice(0, 40).join(' ')} />
      </MetaTags>

      {load ? <div className="spinner-border text-primary loadingIcon" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
        :

        <div className="singlePostWrapper">
          {post.photo &&
            (<img className='singlePostImg' src={PF + post.photo}
              alt='anlakshya' />)
          }

          {
            updateMode ? <input type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}

            >
            </input> : (

              <h1 className="singlePostTitle">
                {title}

                {post.username === user?.username && (
                  <div className="singlePostEdit">
                    <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                    <i className="singlePostIcon fa-solid fa-trash" onClick={() => {
                      confirmAlert({
                        message: "Do you really want to delete this post ?",
                        buttons: [
                          {
                            label: 'Yes',
                            onClick: () => handleDelete()
                          },
                          {
                            label: 'No',

                          }
                        ]
                      }
                      )


                    }}></i>
                  </div>
                )}

              </h1>


            )
          }

          <div className="singlePostInfo">
            <span className='singlePostAuthor'>Author :
              <Link style={{ textDecoration: "none", color: "inherit" }} to={`/post/?user=${post.username}`}><b style={{ color: "red" }}>{post.username.charAt(0).toUpperCase() + post.username.slice(1)}</b></Link></span>
            {/* <span className="badge rounded-pill bg-danger">Visitors : {post.view}</span> */}
            <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
          </div>

          {updateMode ?
            <ReactQuill className='quillEditor' theme="snow" modules={modules} placeholder='Tell your story...' value={desc} onChange={setDesc} />

            :
            (
              <p className='singlePostDesc' dangerouslySetInnerHTML={{ __html: desc }} onCopy={(e) => {
                e.preventDefault()
              }} />

            )}


          <br ></br>
          <br ></br>

          {/* For Links URL And Heading  */}

          {updateMode ?
            <input type="text" value={linkTitle} className="singlePostLinkInput" placeholder='Enter the Heading for Link'
              onChange={(e) => setLinkTitle(e.target.value)}
              style={{ marginTop: "20px" }}
            />
            :
            linkTitle && <>
              <div className='InarticleAds mb-2'>
                {window.location.href.includes("anlakshya.tech") ? <InarticleAds /> : ""}
              </div>
              <h5 className='linkTitle'>{linkTitle} </h5>
              <div className='InarticleAds mt-2'>
                {window.location.href.includes("anlakshya.tech") ? <InarticleAds /> : ""}
              </div>

            </>

          }

          {updateMode ?
            <input type="text" value={link} className="singlePostLinkInput" placeholder='Please Paste the link here'
              onChange={(e) => setLink(e.target.value)}
              style={{ marginTop: "20px" }} />
            :
            link && <a href={link} type="button" className="btn btn-danger" target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "20px" }}>Click Here</a>
          }


          {updateMode &&
            (
              <button className="singlePostButton" onClick={() => {
                confirmAlert({
                  message: "Do you really want to update this post ?",
                  buttons: [
                    {
                      label: 'Yes',
                      onClick: () => handleUpdate()
                    },
                    {
                      label: 'No',

                    }
                  ]
                }
                )

              }}>Update</button>
            )}

        </div>

      }
    </div>
  )
}

export default SinglePost