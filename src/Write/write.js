import axios from "axios";
import React, { useContext } from "react";
import { Context } from "../Context/Context";
import "./write.css";
import { useState } from "react";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Write() {
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: category,
      link: link,
      linkTitle: linkTitle,
      photo: image,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("https://api-anlakshya.onrender.com/upload", data);
      } catch (error) {
        alert(error);
      }
    }
    try {
      let authtoken = localStorage.getItem("auth-token");
      const res = await axios.post(
        "https://api-anlakshya.onrender.com/api/posts",
        newPost,
        {
          headers: {
            "auth-token": authtoken,
          },
        }
      );

      navigate(`/post/${res.data._id}`);
    } catch (error) {
      alert("error");
    }
  };

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
    <>
      <div className="write">
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}

        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            {/* <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />    */}
            <input
              type="text"
              placeholder="Enter a Attractive title"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup Cats">
            <label htmlFor="category">Category &nbsp; &nbsp;</label>
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select</option>
              <option value="wipro">Wipro</option>
              <option value="infosys">Infosys</option>
              <option value="tcs">TCS</option>
              <option value="interview">Interview</option>
              <option value="capgemini">Capgemini</option>
              <option value="Cognizant">Cognizant</option>
              <option value="project">Project</option>
              <option value="other">Other</option>
            </select>
            <span className="or"> OR </span>
          </div>
          {category=="" && <div className="writeLinkGroup">
            <input
              type="text"
              placeholder="Create a New category"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setCategory(e.target.value)}              
            />
          </div>}
          <div className="writeFormGroup ">
            <input
              type="text"
              placeholder="Enter the complete url of the image"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="writeFormGroup">
            <ReactQuill
              className="quillEditor"
              theme="snow"
              modules={modules}
              placeholder="Tell your story..."
              value={desc}
              onChange={setDesc}
            />
            {/* <textarea placeholder='Tell your story...' type="text"
            className='writeInput writeText' onChange={e => setDesc(e.target.value)}></textarea>
            */}
          </div>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
          <div className="writeLinkGroup mt-5">
            <div className="linkTitle">
              <input
                type="text"
                placeholder="Link Heading Message"
                className="writeInput"
                onChange={(e) => setLinkTitle(e.target.value)}
              />
            </div>
            <div className="link">
              <input
                type="text"
                placeholder="Please Paste the Link"
                className="writeInput"
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Write;
