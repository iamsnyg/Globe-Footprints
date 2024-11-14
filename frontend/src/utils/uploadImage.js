import axiosInstance from "./axiosInstance";

const uploadImage=async(imageFile)=>{
    const formData=new FormData();

    formData.append("image", imageFile);


    try {
        const response=await axiosInstance.post("/upload-image", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        console.log("responseData====>>>", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in uploading image", error);
        throw error;
        
    }
}

export default uploadImage;