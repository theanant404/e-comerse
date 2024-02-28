"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const[saved,setSaved]=useState(false)
  const[isSaving,setIsSeving]=useState(false);
  const [isUploding,setIsUploding]=useState(false)
  const [image,setImage]=useState('')
  const { status } = session;
  // console.log(session)
  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image)
    }
  }, [session, status]);
  async function handleProfileInfoUpdate(e) {
    e.preventDefault();
    setSaved(false)
    setIsSeving(true)
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName,image }),
    });
    setIsSeving(false)
    if (response.ok){
        setSaved(true);
    }

  }

  // file
  async function handleFileChange(e){
    // console.log(e)
    
    const files=e.target.files;
    if(files?.length===1){
        console.log('upload start')
        const data=new FormData;
        data.set('file',files[0]);
        toast("Uploding....")
        const response= await fetch('/api/upload',{
            method:'POST',
            body:data,
            // headers:{'Content-Type':'multipart/form-data'}
        })
        toast.success("Upload completed!")
        const link=await response.json()
        setImage(link)
        
    }
  }
  
  if (status === "loading") {
    return "Loding...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  
  return (
    <section className=" mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto border">
        {saved && (
            <h2 className="text-center bg-green-300 rounded-lg p-2 border border-green-400">Profile saved!</h2>
        )}
        {isSaving && (
            <h2 className="text-center bg-blue-300 rounded-lg p-2 border border-blue-400">Saving....</h2>
        )}
        {isUploding &&(
            <h2 className="text-center bg-blue-300 rounded-lg p-2 border border-blue-400">Uploding....</h2>
        )}
        <div className="flex gap-2 items-center">
          <div>
            <div className="bg-slate-200 p-2 shadow-lg rounded-full mx-w-[120px]">
              <Image
                className="rounded-full"
                src={image}
                width={80}
                height={80}
                alt="avtar"
              />
            </div>
            <label>
                <input 
                onChange={handleFileChange}
                type="file" className="hidden" />
                <span className="block border border-gray-300 rounded-lg p-1 text-center cursor-pointer">Edit</span>
            </label>
          </div>
          <form onSubmit={handleProfileInfoUpdate} className="grow">
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="name"
              value={userName}
            />
            <input
              type="email"
              disabled={true}
              value={session.data.user.email}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
