import uniqid from 'uniqid'
import { uploadOnCloudinary } from "@/lib/cloudinary";
import {writeFile} from 'fs/promises'


export async function POST(req){
    

    const data=await req.formData();
    const file=data.get('file');
    console.log(data.get('file'))
    if(data.get('file')){
    //     // uplode file 
        // const ext=file.name.split('.').slice(-1);
        // const newFileName='the_anant.com_'+uniqid()+'.'+ext
        // console.log(newFileName)
        let avtarLocalPath=file.name
        const path=`./public/${avtarLocalPath}`
        console.log(path)
        // writeFile(path,avtarLocalPath)
        console.log(path)
      
        const AvtarImage=await uploadOnCloudinary(file.name)
         
        console.log(AvtarImage)
    }
    // console.log(req)
    return Response.json(true);

}