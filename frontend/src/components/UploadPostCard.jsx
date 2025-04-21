import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'
import axiosInstance from '../api/axiosInstance';
import url from '../../url';

import axios from 'axios';
import { useSelector } from 'react-redux';

const UploadPostCard = () => {

  let authSlice = useSelector((state) => state.auth)
  const [text, setText] = useState('');
  const [showEmojiBox, setshowEmojiBox] = useState(false);
  const [uploadedImages, setUplaodedImages] = useState('')
  const [uploadedVideos, setUplaodedVideos] = useState('')

  const handleInputChanger = (e) => {
    setshowEmojiBox(false)
    let value = e.target.value;
    console.log(value)
    setText(value)
  }

  const handleEmoji = (e) => {
    console.log(e.emoji)
    let ans = text.concat(e.emoji);
    setText(ans)
  }

  const handleImageChanger = (e) => {
    let files = [...e.target.files]
    console.log(files)
    setUplaodedImages(files)
  }

  const handleVideoChanger = (e) => {
    let files = [...e.target.files];
    console.log(files)
    setUplaodedVideos(files)
  }

  const handleSubmit = async () => {
    let obj = {
      title: text,
    }
    if (uploadedImages || uploadedVideos) {
      let files = [...uploadedImages, ...uploadedVideos]
      obj.file = files
    }


    const formData = new FormData();
    formData.append('title', text);

    obj.file?.forEach((file) => {
      formData.append('file', file); // Correct way to append multiple files
    });

    try {
      const response = await axios.post(url+'/post/create', formData, {
        headers: {
          'Authorization': authSlice.token
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadPercent(percent);
        },
      });
      console.log(response.data);
      alert("Post uploaded successfully!");
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("Error uploading post.");
    }


  }
  return (
    <div className='relative h-max m-auto w-max my-3 '>
      <div className="md:w-md ld:w-lg sm:w-sm mx-auto uploader   p-4  rounded-2xl shadow-md border border-gray-200">
        <div className="flex items-center space-x-3">
          <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="User" className="w-10 object-cover object-center h-10 rounded-full" />
          <input value={text} onChange={handleInputChanger} type="text" placeholder="What's on your mind?" className="flex-1 px-4 py-2 text-black placeholder:text-gray-400 bg-gray-100 rounded-full focus:outline-none" />
        </div>
        {uploadedImages && <div className='grid grid-cols-3 mt-2 mb-1 place-self-center gap-2'>
          {
            uploadedImages.map((imgObj) => {
              return <img accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp" className='w-[100px] h-[100px]' src={URL.createObjectURL(imgObj)} alt="" />
            })
          }
        </div>}
        {uploadedVideos && <div className='grid grid-cols-3 mt-1 mb-2 place-self-center gap-2'>
          {
            uploadedVideos.map((vidObj) => {
              return <video accept="video/*" src={URL.createObjectURL(vidObj)} controls className='w-[100px] h-[100px]'></video>
            })
          }
        </div>}
        <div className="flex justify-between   mt-3">
          <label htmlFor='image' className="flex items-center space-x-2 text-white hover:text-blue-500">
            📷 <span>Photo</span>
            <input onChange={handleImageChanger} type="file" multiple hidden id='image' />
          </label>
          <label htmlFor='video' className="flex items-center space-x-2 text-white hover:text-green-500">
            🎥 <span>Video</span>
            <input multiple onChange={handleVideoChanger} type="file" hidden id='video' />
          </label>
          <button onClick={() => setshowEmojiBox(!showEmojiBox)} className="flex items-center space-x-2  text-white hover:text-red-500">
            😀 <span>Feeling</span>
          </button>
          <button onClick={handleSubmit} className="flex items-center space-x-2 bg-amber-500 px-3 py-2 rounded-md  text-white hover:bg-amber-700 cursor-pointer">
            post
          </button>
        </div>
      </div>
      <div className='absolute right-0'>
        <EmojiPicker searchDisabled={true} style={{ width: '300px' }} open={showEmojiBox} onEmojiClick={handleEmoji} />
      </div>



    </div>
  )
}

export default UploadPostCard
