/** @format */
import React, { useState, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { authContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet-async";

export default function Profile() {
  const { token, setUser } = useContext(authContext);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onUpdateName = async (formData) => {
    const loadId = toast.loading("Updating records...");
    setLoading(true);
    try {
      const { data } = await axios.patch(
        "https://todo-nti.vercel.app/user/update-user",
        { name: formData.name },
        { headers: { token } }
      );

      const updatedUser = data.user;
      setUserData(updatedUser);

      localStorage.setItem("userName", updatedUser.name);
      setUser(updatedUser.name);

      toast.success("Profile Updated", { id: loadId });
      setIsEditing(false);
    } catch (err) {
      toast.error("Database sync failed.", { id: loadId });
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
      <Helmet>
        <title>Profile</title>
      </Helmet>


      <div className="min-h-screen bg-[#F8F4EE] pt-32 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        
        <div className="mb-12 border-b border-[#E5DDD4] pb-8 text-center md:text-left">
          <h1 className="text-4xl font-serif text-[#1A1612]">Account Details</h1>
          <p className="text-[#9C8E82] text-[10px] tracking-[0.3em] uppercase font-bold mt-2">Personal Information & Identity</p>
        </div>

        <div className="bg-white border border-[#E5DDD4] shadow-sm overflow-hidden">
          <div className="p-8 md:p-12">
            
            <div className="flex flex-col md:flex-row gap-12 items-start">
              
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="w-32 h-32 bg-[#1A1612] text-white rounded-full flex items-center justify-center text-4xl font-serif shadow-xl mb-4">
                  {userData?.name?.charAt(0) || "U"}
                </div>
              </div>

              <div className="w-full md:w-2/3 space-y-8">
                
                <form onSubmit={handleSubmit(onUpdateName)} className="space-y-8">
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#9C8E82] uppercase tracking-widest">Full Name</label>
                    <div className="flex gap-4">
                      {isEditing ? (
                        <input 
                          {...register("name", { required: "Name is required" })}
                          defaultValue={userData?.name}
                          className="flex-1 bg-[#FBF9F6] border border-[#E5DDD4] p-3 text-sm outline-none focus:border-[#C8571A] transition-colors"
                        />
                      ) : (
                        <p className="flex-1 text-xl font-serif text-[#1A1612] py-2">{userData?.name}</p>
                      )}
                      
                      {!isEditing && (
                        <button 
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="text-[10px] font-bold text-[#C8571A] hover:underline"
                        >
                          EDIT
                        </button>
                      )}
                    </div>
                    {errors.name && <p className="text-red-500 text-[10px] italic">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#9C8E82] uppercase tracking-widest">Email Address</label>
                    <div className="bg-[#FBF9F6] border border-[#F2E8E0] p-4">
                      <p className="text-sm text-[#5C5047] font-medium">
                        {userData?.email || "Update name to reveal email"}
                      </p>
                    </div>
                    <p className="text-[9px] text-[#9C8E82] italic">Registered email cannot be changed for security.</p>
                  </div>

                  {isEditing && (
                    <div className="pt-4">
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#1A1612] text-white py-4 text-[11px] font-bold tracking-[0.2em] hover:bg-black transition-all shadow-lg disabled:opacity-50"
                      >
                        {loading ? "SAVING CHANGES..." : "SAVE PROFILE"}
                      </button>
                    </div>
                  )}
                </form>

              </div>
            </div>
          </div>
          
        </div>

      </div>
    </div>
      </>
  );
}