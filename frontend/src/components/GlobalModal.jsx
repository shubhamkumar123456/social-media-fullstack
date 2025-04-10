import React from 'react'
import {  Modal } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from 'react-redux';


const GlobalModal = (props) => {
        console.log(props)
        let userSlice = useSelector((state)=>state.auth)
        let userId = userSlice?.user?._id
  return (
    <div>
       {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal title="Basic Modal" open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
            {
                props?.comments?.map((comnt, i)=>{
                    return <div className='flex gap-2 relative mb-2 w-full'>
                            <img src={comnt?.user?.profilePic} className='w-10 h-10 rounded-full' alt="" />
                            <div className='mt-2 w-full'>
                                <h4 className='font-semibold'>{comnt?.user?.firstName.concat(' ',comnt?.user?.lastName)}</h4>
                                <p>{comnt.text}</p>
                                <p style={{fontSize:"10px",float:"inline-end"}} className='text-gray-500 '> {dayjs(comnt.createdAt).fromNow()} </p>
                            </div>
                          {userId===comnt?.user?._id &&  <MdDeleteOutline size={20} color='red' className='absolute cursor-pointer right-4 top-4'/>}

                    </div>
                })
            }
      </Modal>
    </div>
  )
}

export default GlobalModal
