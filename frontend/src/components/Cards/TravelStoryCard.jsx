import React from 'react'
import moment from 'moment'
import { GrMapLocation } from "react-icons/gr";
import { IoCalendarSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
function TravelStoryCard({
    imgUrl,
    title,
    story,
    visitedLocation,
    date,
    isFavorite,
    onFavouriteClick,
    onEdit,
    onClick

}) {

    
    return (
    <div className='group relative   '>
        <div className='aspect-h-1 aspect-w-1  shadow-lg   w-full overflow-hidden rounded-md bg-white hover:bg-cyan-50 lg:aspect-none  lg:h-80 grid grid-cols-3 transition-all ease-in-out relative cursor-pointer'>
            <img src={imgUrl} alt={title} className='h-full w-full object-cover object-center lg:h-full lg:w-full'
            onClick={onClick}
            />
            <div className='p-4 mt-3 ml-3 col-span-2 flex-row'>
                <div className='flex'>
                    <div>
                        <h4 className='text-sm font-medium'>{title}</h4>
                        <div
                        className='flex items-center gap-5 mt-3 '
                        >
                            <IoCalendarSharp className='text-cyan-500' />
                            <span className='text-sm text-slate-500'>{date ? moment(date).format("Do MMMM YYYY") : "-"}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <p className='text-sm text-slate-600 mt-3'>{story?.length > 50 ? story.slice(0, 50) + "..." : story}</p>
                </div>

                <div className='inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded px-2 py-1 mt-3'>
                    <GrMapLocation className='text-cyan-500' />
                    {visitedLocation.map((item, index) => visitedLocation.length + 1 ? `${item}` : `${item}, `)}
                    
                </div>

                <button
                onClick={onFavouriteClick}
                className='w-8 h-8 flex items-center justify-center bg-red-100 rounded-lg border border-white/30 absolute top-4 right-4'
                >
                    <FaHeart 
                    className={`icon-btn ${isFavorite ? 'text-red-500' : 'text-white'} w-4 h-4`}
                    />
                    {/* {console.log("isFavourite=>",isFavorite)} */}
                </button>

            </div>

        </div>
    </div>
    )
}

export default TravelStoryCard