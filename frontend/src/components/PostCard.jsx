/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import axiosInstance from '../api/axiosInstance';
import GlobalModal from './GlobalModal';

export default function PostCard({ ele ,fetchPosts }) {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const showModal = () => {
        setIsModalOpen(true);
      };

      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    const inputRef = React.useRef()
    console.log(ele)
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
    };

    let authSlice = useSelector((state)=>state.auth);
    // console.log(authSlice)
    let user = authSlice.user;
    // console.log(user) 

    const handleLike = async()=>{
        let response = await axiosInstance.put(`/post/likes/${ele._id}`)
        let data = response.data
        // console.log(data)
        fetchPosts()
    }

    const handlePostSubmit =async ()=>{
        let value = inputRef.current.value;
        console.log(value)
        let response = await axiosInstance.post(`/post/comment/${ele._id}`,{
            text:value
        })
        let data = response.data;
        console.log(data)
        if(data){
            inputRef.current.value = ''
        }
        fetchPosts()
    }

    return (
     <div>
        <GlobalModal comments={ele.comments} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}  setIsModalOpen={setIsModalOpen} />
           <Card
            variant="outlined"
            sx={{ minWidth: 300, '--Card-radius': (theme) => theme.vars.radius.xs }}
        >
            <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
                <Box
                    sx={{
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            m: '-2px',
                            borderRadius: '50%',
                            // background:
                                // 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                        },
                    }}
                >
                    <Avatar
                        size="sm"
                        src={ele.userId.profilePic}
                        sx={{}}
                    />
                </Box>
                <Typography sx={{ fontWeight: 'lg' }}> {ele.userId.firstName.concat(' ', ele.userId.lastName)} </Typography>
                <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                    <MoreHoriz />
                </IconButton>
            </CardContent>
            <div className="slider-container w-[300px] h-[250px]">
      {ele.file.length>0 ?<Slider {...settings}>
        {
          ele.file.map((obj,i)=>{
            return obj.url.includes('image')?<div key={obj.url}>
            <img src={obj.url} alt="" />
          </div>
          :
        
          <div key={obj.url}>
          <video className='max-h-[250px] m-auto object-contain' src={obj.url}></video>
        </div>
      
          })
        }
      
      </Slider> : <div className='h-full max-h-250px w-full flex justify-center items-center'><p>{ele.title}</p></div>}
    </div>
            {/* <div className=' bg-amber-700'>
                <Slider {...settings} className='w-[300px] bg-green-500 h-[200px]  bg-no-repeat'>
                    {
                        ele.file.map((obj, i) => {
                            return obj.url.includes('image') ?
                             <div className='w-[300px] h-[200px] bg-black'><img className='h-full w-full object-cover' src={obj.url} alt="" /></div>
                              : obj.url.includes('video') ?
                               <div className='w-[300px] h-[200px]'><video className='w-full h-full object-cover' src={obj.url}></video></div>
                                : <p>this is text</p>
                        })
                    }
                </Slider>
            </div> */}
            <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
                <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
                   {!ele.likes.includes(user._id)?  <IconButton variant="plain" color="neutral" size="sm">
                    <FaRegHeart onClick={handleLike} size={30}/> <sup>{ele.likes.length}</sup>
                    </IconButton>
                        :
                    <IconButton variant="plain" color="neutral" size="sm">
                    <FaHeart onClick={handleLike} size={30} color='red'/> <sup>{ele.likes.length}</sup>
                    </IconButton>}
                    <IconButton variant="plain" color="neutral" size="sm">
                        <ModeCommentOutlined onClick={showModal}  /> <sup>{ele.comments.length}</sup>
                    </IconButton>
                    {/* <IconButton variant="plain" color="neutral" size="sm">
                        <SendOutlined />
                    </IconButton> */}
                </Box>
               
            </CardContent>
            <CardContent>
                <Link
                    component="button"
                    underline="none"
                    textColor="text.primary"
                    sx={{ fontSize: 'sm', fontWeight: 'lg' }}
                >
                    8.1M Likes
                </Link>
              {ele.file.length>0 &&  <Typography sx={{ fontSize: 'sm' }}>
                     { ele.title}
                </Typography>}
                <Link
                    component="button"
                    underline="none"
                    startDecorator="…"
                    sx={{ fontSize: 'sm', color: 'text.tertiary' }}
                >
                    more
                </Link>
                <Link
                    component="button"
                    underline="none"
                    sx={{ fontSize: '10px', color: 'text.tertiary', my: 0.5 }}
                >
                    2 DAYS AGO
                </Link>
            </CardContent>
            <CardContent orientation="horizontal" sx={{ gap: 1 }}>
                <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                    <Face />
                </IconButton>
                <input
                    ref = {inputRef}
                    className='outline-none px-2'
                    variant="plain"
                    size="sm"
                    placeholder="Add a comment…"
                    sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
                />
                <button onClick={handlePostSubmit} className='bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600'  underline="none" role="button">
                    Post
                </button>
            </CardContent>
        </Card>
     </div>
    );
}
