import React, { useEffect, useRef, useState } from 'react'
import { FaRegFile, FaRegFileImage } from 'react-icons/fa';
import { MdDelete, MdDeleteOutline } from 'react-icons/md';

function ImageSelector({image, setImage, handleDeleteImg}) {

    const inputRef=useRef(null);
    const [previewUrl, setPreviewUrl]=useState(null)

    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        if(file){
            // setImage(file);
            // const reader=new FileReader();
            // reader.onloadend=()=>{
            //     setPreviewUrl(reader.result);
            // }
            // reader.readAsDataURL(file);

            // const reader=new FileReader();
            // reader.onloadend=()=>{
            //     setPreviewUrl(reader.result);
            // }
            // reader.readAsDataURL(file);

            setImage(file);
        }
    }

    const onChooseFile=()=>{
        inputRef.current.click();

    }

    const handleRemoveImage=()=>{
        setImage(null);
        handleDeleteImg();
    }


    useEffect(()=>{
        if(typeof image === "string"){
            setPreviewUrl(image);
        }else if(image){
            // const reader=new FileReader();
            // reader.onloadend=()=>{
            //     setPreviewUrl(reader.result);
            // }
            // reader.readAsDataURL(image);

            setPreviewUrl(URL.createObjectURL(image));
        }else{
            setPreviewUrl(null);
        }

        return ()=>{
            if(image){
                URL.revokeObjectURL(previewUrl)
            }
                
        }
    }, [image])
  return (
    <div>
        <input type="file"
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'

        />
        {/*  */}

        {
            !image ? (
                <button className='w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-100 rounded border border-slate-200/50  ' onClick={()=>onChooseFile()}>
                <div className='w-14 h-14 flex items-center justify-center gap-4 bg-cyan-100 rounded-full border border-cyan-300'>
                    <FaRegFileImage className='text-xl text-cyan-500' />
                </div>

                <p className='text-sm text-slate-500'>
                    Browse Image file to upload.
                </p>
                
                </button>
            ) : (
                <div className='w-full relative'>
                    <img src={previewUrl} alt="preview" sizes="80vw" className='w-full size-auto  object-cover rounded-lg' />

                    <button
                    className='btn-delete btn-small absolute top-2 right-2'
                    onClick={handleRemoveImage}
                    >
                        <MdDeleteOutline className='text-lg' />
                    </button>
                </div>
            )

            
        }
    </div>
  )
}

export default ImageSelector