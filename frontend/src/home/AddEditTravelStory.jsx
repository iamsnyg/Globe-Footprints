import React, { useState } from 'react'
import { MdAdd, MdClose, MdDelete, MdUpdate } from 'react-icons/md'
import DateSlecter from '../components/Input/DateSlecter'
import ImageSelector from '../components/Input/ImageSelector'
import TagInput from '../components/Input/TagInput'
// import { getAllTravelStories } from '../home/Home'
import axiosInstance from '../../src/utils/axiosInstance'
import moment from 'moment'
import { toast } from 'react-toastify'
import uploadImage from '../utils/uploadImage'

function AddEditTravelStory({
    storyInfo,
    type,
    onClose,
    getAllTravelStories
}) {

    const [error, setError]=useState(null)

    const [visitedDate, setVisitedDate]=useState(storyInfo?.visitedDate || null)
    const [title, setTitle]=useState(storyInfo?.title || "")
    const [storyImg, setStoryImg]=useState(storyInfo?.imageUrl || null)
    const [story, setStory]=useState(storyInfo?.story || "")
    const [visitedLocation, setVisitedLocation]=useState(storyInfo?.visitedLocation || [])


    const addNewTravelStory=async ()=>{
        try {
            
            
            let imageUrl="";

            

            if(storyImg){
                const imageUploadRes=await uploadImage(storyImg);
                imageUrl=imageUploadRes.imageUrl || "";
            }
            // console.log("typeof", typeof storyImg) 
            
            

            const response=await axiosInstance.post("/add-travel-story", {
                title,
                story,
                imageUrl: imageUrl || "",
                visitedLocation,
                visitedDate: visitedDate 
                ? moment(visitedDate).valueOf() 
                : moment().valueOf()
            })

            console.log("response", response.data)

            if(response.data && response.data.story){
                toast.success("Story added successfully")
                getAllTravelStories();
                onClose();

            }
    
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)

            }else{
                setError("Something went wrong, Please try again later")
            }
        }
        
    }

    const updateTravelStory=async()=>{

        // console.log("typeof updateTravel", typeof storyImg)
        // console.log("Update storyImg", storyImg)
        // console.log("<<------------------------------->>")
        // console.log("<<------------------------------->>")


        const storyId=storyInfo?._id;

        // console.log("storyId", storyId)

        try {
            
            let imageUrl="";

            const postData={
                title,
                story,
                imageUrl: storyInfo?.imageUrl || "",
                visitedLocation,
                visitedDate: visitedDate 
                ? moment(visitedDate).valueOf() 
                : moment().valueOf(),

            }
            
            

           if(typeof storyImg === "object"){
                const imageUploadRes=await uploadImage(storyImg);
                imageUrl=imageUploadRes.imageUrl || "";

                postData.imageUrl=imageUrl;


            }

            // console.log("typeof updateTravel", typeof storyImg)
            // console.log("Update storyImg", storyImg)




            const response=await axiosInstance.post("/edit-story/"+ storyId, postData)

            console.log("response", response.data)

            if(response.data && response.data.story){
                toast.success("Story Update successfully")
                getAllTravelStories();
                onClose();

            }
    
        }catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)

            }else{
                setError("Something went wrong, Please try again later")
            }
        }
    }


    const handleAddOrUpdateClick=()=>{
        console.log("add", {title, visitedDate, storyImg, story, visitedLocation})

        if(!title){
            setError("Title is required");
            return;
        }

        if(!story){
            setError("Story is required")
            return;
        }

        setError("");

        if(type === "edit"){
            updateTravelStory();

        }else{

            // console.log("----------------------------------->>>>>>")
            addNewTravelStory();
        }


    }

    const handleDeleteStoryImg=async ()=>{
        const deleteImgRes=await axiosInstance.delete("/delete-image", {
            params:{
                imageUrl: storyInfo?.imageUrl
            }
        });

        if(deleteImgRes.data){
            const storyId=storyInfo?._id;

            const postData={
                title,
                story,
                imageUrl: "",
                visitedLocation,
                visitedDate: moment().valueOf()
            };

            const response=await axiosInstance.post("/edit-story/"+ storyId, postData);

            setStoryImg(null);

        }
    }  
  return (
    <div className='relative'>
        <div className='flex items-center justify-between border-b border-slate-200 p-3'>
            <h5 className='text-lg font-semibold text-slate-700'>
                {type === "add" ? "Add Story" : "Update Story"} 
            </h5>

            <div>
                <div className='flex items-center gap-5 bg-cyan-50/50 p-2 rounded-l-lg'>
                    {
                       type === "add" ? (
                        <button className='btn-small' onClick={handleAddOrUpdateClick}>
                            <MdAdd className='text-lg' /> Add Story
                        </button>
                       ) : (
                        <>
                            <button className='btn-small' onClick={handleAddOrUpdateClick}>
                                <MdUpdate className='text-lg' /> Update Story
                            </button>
                            <button className='btn-delete btn-small' onClick={onClose}>
                                <MdDelete className='text-lg' />Delete
                            </button>
                        </>
                       ) 
                    }

                    <button className='' onClick={onClose}>
                        <MdClose className='text-xl text-slate-400'  />
                    </button>
                </div>

                {error && <p className='text-red-500 text-sm text-right mt-2'>{error}</p>}
            </div>
        </div>

        <div>
            <div className='flex-1 flex flex-col gap-2 pt-4'>
                <label className='input-label'>TITLE</label>
                <input type="text"
                className='text-2xl outline-none text-slate-950'
                placeholder='Take only memories, leave footprints...'
                value={title}
                onChange={({target})=>setTitle(target.value)}
                />

                <div>
                    <DateSlecter date={visitedDate} setDate={setVisitedDate} />
                </div>


                
                <ImageSelector image={storyImg}  setImage={setStoryImg} handleDeleteImg={handleDeleteStoryImg}/>
                

                <div className='flex flex-col gap-2 mt-4'>
                    <label className='input-label' >Your Story</label>
                    <textarea
                    type="text"
                    className='text-sm outline-none text-slate-950 bg-slate-200 p-2 rounded'
                    placeholder='Write your story here...'
                    rows={10}
                    value={story}
                    onChange={({target})=>setStory(target.value)}
                    />
                    
                </div>

                <div className='pt-3' >
                    <label className='input-label'>Visited Location: </label>
                    <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddEditTravelStory