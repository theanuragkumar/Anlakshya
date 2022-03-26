import React from 'react'
import "./write.css"
function write() {
  return (
    <div className='write'>
        <img className="writeImg" src="https://1.bp.blogspot.com/-YD1qU5GQGuE/YF9gPQ6bcZI/AAAAAAAAGwc/EMwB15mCPawhTH58ydDlPFSTni3sF-2ZwCLcBGAsYHQ/s1920/home.jpg"
         alt="" />
        <form action="" className="writeForm">
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                <i className="writeIcon fa-solid fa-plus"></i>
                </label>
                <input type="file"  id="fileInput" style={{display:"none"}}/>
                <input type="text" placeholder='Title' className='writeInput' autoFocus={true} />
            </div>
            <div className="writeFormGroup">
                <textarea placeholder='Tell your story...' type="text"
                className='writeInput writeText'></textarea>
            </div>
            <button className='writeSubmit'>Publish</button>

        </form>
    </div>
  )
}

export default write