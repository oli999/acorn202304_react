import { useState } from "react"


export default function Test(){
    const [image, setImage]=useState(null);
    const [images, setImages]=useState([]);
    const handleChange=(e)=>{
        const file=e.target.files[0];
        console.log(file);
        setImage(file);
    }
    const handleChange2=(e)=>{
        console.log(e.target.files);
    }
    return (
        <>
            <h3>이미지 업로드 테스트</h3>
            <input type="file" name="image" accept="image/*" onChange={handleChange}/>
            <h3>이미지 업로드 테스드 multi</h3>
            <input multiple type="file" name="image" accept="image/*" onChange={handleChange2}/>
        </>
    )
}