import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import Model from 'react-modal'
import axiosInstance from '../utils/axiosInstance';
import { MdAdd } from "react-icons/md";
import TravelStoryCard from '../components/Cards/TravelStoryCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditTravelStory from './AddEditTravelStory';
import ViewTravelStory from './ViewTravelStory';
import EmptyCard from '../components/Cards/EmptyCard';
import img from "../assets/abcdefgh.svg"
import { DayPicker } from 'react-day-picker';
import moment from 'moment';
import FilterInfoTitle from '../components/Cards/FilterInfoTitle';

function Home() {

  const navigate = useNavigate();
  const [userInfo, setUserInfo]=useState(null)
  const [allStories, setAllStories]=useState([])
  const [filterType, setFilterType]=useState("")
  const [searchQuery, setSearchQuery]=useState("")
  const [dateRange, setDateRange]=useState({
    from: null,
    to: null
  })
  const [openAddEditModal, setOpenAddEditModal]=useState({
    isShow: false,
    type: "add",
    data: null
  })

  const [openViewModal, setOpenViewModal]=useState({
    isShow: false,
    data: null
  })

  const getUserInfo= async()=>{

    try {
      const response= await axiosInstance.get("/get-user");
      
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
        
      }
      // console.log("<---------------------------------------------->")
      // console.log("User Info: ", userInfo)
      
    } catch (error) {
      
      if(error.response.status===401){
        localStorage.clear();
        navigate('/login');
      }
    }
  }

  const getAllTravelStories=async()=>{
    try{
      const response= await axiosInstance.get("/get-all-travel-stories");
      // console.log("TRavel Stories", response.data?.stories);
      if(response.data && response.data.stories){
        
        setAllStories(response.data?.stories);
      }
    }catch(error){
      console.log("Error in getting all stories from frontend side");
    }
  }

  const handleEdit=(data)=>{
    setOpenAddEditModal({
      isShow: true,
      type: "edit",
      data: data
    })
  }

  const handleViewStory=(data)=>{
    setOpenViewModal({
      isShow: true,
      data : data 
    })
  }

  const updateIsFavourite=async(storyData)=>{
    const storyId=storyData._id;
    // console.log("Story ID: ", storyId);

    try{
      const response= await axiosInstance.put("/update-is-favorite/"+storyId, 
      {
        isFavorite: !storyData.isFavorite
      }
      );

      // console.log("Response from update isFavorite", response.data.story);

      if(response?.data && response?.data?.story){
        toast.success("Favourite Updated Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        if(filterType==="search" && searchQuery){
          onSearchStory(searchQuery);
        }else if(filterType==="date"){
          filterStoryByDate(dateRange);
        }else{
          getAllTravelStories();
        }


      }
    }catch(error){
      console.log("Error in updating isFavourite from frontend side");

    }
  }

  const deleteTravelStory=async(data)=>{
    const storyId=data._id;
    console.log("Story ID: ", storyId);

    try{
      const response= await axiosInstance.delete("/delete-story/"+storyId);

      console.log("Response from delete story", response.data);
      // console.log("Response from delete story", response.data);
      if(response?.data && response?.data?.message){
        toast.success("Story Deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        getAllTravelStories();
        setOpenViewModal({
          isShow: false,
          data: null
        })
      }
    }catch(error){
      console.log("Error in deleting story from frontend side");
    }
  }

  const onSearchStory=async(query)=>{
    try{
      const response= await axiosInstance.get("/search", {
        params: {
          query: query
        }
      });

      if(response?.data && response?.data?.stories){
        setFilterType("search");
        setAllStories(response.data.stories);
      }
    }catch(error){
      console.log("Error in searching story from frontend side");

    }
  }

  const handleClearSearch=async()=>{
    setFilterType("");
    setSearchQuery("");
    getAllTravelStories();
  }

  const filterStoryByDate=async(day)=>{
    try{
      const startDate= day.from ? moment(day.from).valueOf() : null;
      const endDate= day.to ? moment(day.to).valueOf() : null;

      if(startDate && endDate){
        const response= await axiosInstance.get("/travel-stories/filter" , {
          params: {startDate, endDate}
        });

        if(response?.data && response?.data?.stories){
          setFilterType("date");
          setAllStories(response.data.stories);
        }
      }

    }catch(error){
      console.log("Error in filtering story by date from frontend side");
    }
  }

  const handleDayClick=(day)=>{
    setDateRange(day)
    filterStoryByDate(day)
  }

  const resetFilter=()=>{
    setFilterType("");
    setDateRange({
      from: null,
      to: null
    })
    getAllTravelStories();
  }

  useEffect(()=>{
    getAllTravelStories();
    getUserInfo();

    return ()=>{}
  },[])
  return (
    <>
      <Navbar userInfo={userInfo}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onSearchNote={onSearchStory}
      handleClearSearch={handleClearSearch}
      />

      

      {/* {JSON.stringify(userInfo)} */}
      <div className='container mx-auto py-10'>
      <FilterInfoTitle 
        filterType={filterType}
        filterDates={dateRange}
        onClear={()=>{
          resetFilter();
        }}
        />
        <div className='flex gap-7'>
          <div className='flex-1'>
            <div></div>
            {allStories.length > 0 ? (
              <div className='mt-6 grid grid-cols-2 gap-x-6 gap-y-10 '>
                {
                  allStories.map((item)=>{
                    return (
                      <TravelStoryCard
                      key={item._id}
                      imgUrl={item?.imageUrl}
                      title={item.title}
                      story={item.story}
                      date={item.visitedDate}
                      visitedLocation={item.visitedLocation}
                      isFavorite={item.isFavorite}

                      onEdit={()=>handleEdit(item)}
                      onClick={()=>handleViewStory(item)}
                      onFavouriteClick={()=>updateIsFavourite(item)}
                      />
                    )
                  })
                }
              </div>
            ) : (
              <>
              <EmptyCard imgSrc={img} message={`Start creating your first Travel Story! CLick the 'Add' Button to jot down your thoughts, ideas and memories. Let's get started!!!`} />
              
              </>
            )
          }
          </div>
          <div className='w-[360px]'>
            <div 
            className='bg-white border border-slate-200 shadow-lg rounded-lg shadow-slate-200/60 '
            >
              <div
              className='p-2'
              >
                <DayPicker 
                // selectedDate={new Date()}
                captionLayout='dropdown-buttons'
                mode="range"
                selected={dateRange}
                onSelect={handleDayClick}
                pagedNavigation
                // className='w-full pr-2'

                />
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <Model 
      isOpen={openAddEditModal.isShow}
      onRequestClose={()=>{}}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999

        },

      }}
      appElement={ document.getElementById('root')}
      className='modal-box'
      >
        <AddEditTravelStory
        type={openAddEditModal.type}
        storyInfo={openAddEditModal.data}
        onClose={()=>{
          setOpenAddEditModal({
            isShow: false,
            type: "add",
            data: null
          })
        }}
        getAllTravelStories={getAllTravelStories}
        />
      </Model>

      <Model 
      isOpen={openViewModal.isShow}
      onRequestClose={()=>{}}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999

        },

      }}
      appElement={ document.getElementById('root')}
      className='modal-box'
      >
        <ViewTravelStory
        // type={openViewModal.type}
        storyInfo={openViewModal.data || null}

        onClose={(preVal)=>{
          setOpenViewModal({...preVal, isShow: false})
        }}
        onEditClick={(preVal)=>{
          setOpenViewModal({...preVal, isShow: false})
          handleEdit(openViewModal.data || null)
        }}
        onDeleteClick={()=>{
          deleteTravelStory(openViewModal.data || null)
        }}
        />
      </Model>



      <button
      className='w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed bottom-20 right-20 '
      onClick={()=>{
        setOpenAddEditModal({
          isShow: true,
          type: "add",
          data: null
        })
      }}
      >
        <MdAdd className='text-[32px] text-white'/>
      </button>
      <ToastContainer />
    </>
  )
}

export default Home