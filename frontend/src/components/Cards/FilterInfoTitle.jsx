import moment from 'moment'
import React from 'react'
import { MdOutlineClose } from 'react-icons/md';

function FilterInfoTitle({filterType, filterDates, onClear}) {

    const DateRangeClip = ({date}) => {
        const startDate = date?.from
        ? moment(date.from).format("Do MMMM YYYY") : "N/A";
        const endDate = date?.to
        ? moment(date.to).format("Do MMMM YYYY") : "N/A";

        return (
            
            <div
            className='flex items-center gap-2 bg-slate-100 px-3 py-2 rounded'
            >
                <p className='text-sm font-medium'>
                    {startDate} - {endDate}
                </p> 

                <button onClick={onClear}>
                    <MdOutlineClose />
                </button>
            </div>
        )

    }
  return (
    filterType && (
    <div className='mt-5'>
        {filterType === "search" ?(
            <h3 className='text-lg font-medium'>Search Result:</h3>
        ): (
            <div className='flex items-center gap-2'>
                <h3 className='text-lg font-medium'>Travel Stories From</h3>

                <DateRangeClip 
                date={filterDates}
                />
            </div>
        )}
    </div>
    )
  )
}

export default FilterInfoTitle