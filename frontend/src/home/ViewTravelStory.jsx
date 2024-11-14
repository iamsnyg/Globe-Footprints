import moment from 'moment'
import React from 'react'
import { GrMapLocation } from 'react-icons/gr'
import { MdClose, MdDelete, MdUpdate } from 'react-icons/md'

function ViewTravelStory({storyInfo, onClose, onEditClick, onDeleteClick}) {
  return (
    <div className='relative'>
        <div className='flex items-center justify-end border-b border-slate-200 p-3'>
            <div>
                <div className='flex items-center gap-5 bg-cyan-50/50 p-2 rounded-l-lg'>
                    <button className='btn-small' onClick={onEditClick}>
                        <MdUpdate className='text-lg' /> Update Story
                    </button> 
                    <button className='btn-small btn-delete' onClick={onDeleteClick}>
                        <MdDelete className='text-lg' /> Delete
                    </button> 



                    <button className='' onClick={onClose}>
                        <MdClose className='text-xl text-slate-400'  />
                    </button>
                </div>

                
            </div>
        </div>

        <div>
            <div
            className='flex-1 flex flex-col  gap-2 py-4'
            >
                <h1 className='text-2xl text-slate-950'>
                    {storyInfo && storyInfo?.title}  
                </h1>

                <div className='flex items-center justify-between gap-3'>
                    <span className='text-xs text-slate-500'>
                        {storyInfo && moment(storyInfo?.visitedDate).format("Do MMMM YYYY")}
                    </span>

                    <div className='inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded px-2 py-1 '>
                        <GrMapLocation className='text-sm'/>
                        {
                            storyInfo && storyInfo?.visitedLocation.map((item, index) => storyInfo?.visitedLocation.length == index+1 ? `${item}` : `${item}, `)
                        }
                    </div>
                </div>
            </div>

            <img
            src={storyInfo && storyInfo?.imageUrl}
            alt={storyInfo && storyInfo?.title}
            className='w-full max-h-full object-cover object-center rounded-lg'
            />

            <div className='p-4 mt-4'>
                <p className='text-slate-950 text-sm leading-6 text-justify whitespace-pre-line'>
                    {storyInfo && storyInfo?.story}
                </p>
            </div>
        </div>
    </div>
  )
}

export default ViewTravelStory