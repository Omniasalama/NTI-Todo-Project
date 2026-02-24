/** @format */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import toast from "react-hot-toast";
import { authContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet-async";


const todoSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  description: z.string().min(5, "Description must be more detailed"),
});

export default function Home() {
  const { token } = useContext(authContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(todoSchema),
  });


  const fetchTodos = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.get("https://todo-nti.vercel.app/todo/get-all", {
        headers: { token } 
      });
      setTodos(data.todos || []); 
    } catch (err) {
      toast.error("Database sync failed.");
    } finally {
      setLoading(false);
    }
  };

  const onAddSubmit = async (formData) => {
    const loadId = toast.loading("Creating in database...");
    try {
      await axios.post("https://todo-nti.vercel.app/todo/create", formData, {
        headers: { token }
      });
      toast.success("Database Updated!", { id: loadId });
      setIsAddModalOpen(false);
      reset();
      await fetchTodos();
    } catch (err) {
      toast.error("Add failed. Try logging in again.", { id: loadId });
    }
  };

  const onUpdateSubmit = async (formData) => {
    const loadId = toast.loading("Patching database...");
    try {
      await axios.patch(`https://todo-nti.vercel.app/todo/update-todo/${selectedTodo._id}`, 
        { description: formData.description }, 
        { headers: { token } }
      );
      toast.success("Update Saved!", { id: loadId });
      setIsUpdateModalOpen(false);
      await fetchTodos(); 
    } catch (err) {
      toast.error("Update failed.", { id: loadId });
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todo-nti.vercel.app/todo/delete-todo/${id}`, {
        headers: { token }
      });
      toast.success("Deleted from database");
      fetchTodos();
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  return (
    <>
    <Helmet>
        <title>Home | TODO App</title>
        <meta name="description" content="Manage your todos" />
      </Helmet>

     <div className="min-h-screen bg-[#F8F4EE] pt-28 pb-12 px-6">
      <div className="max-w-screen-xl mx-auto">
        
        <div className="flex justify-between items-center mb-10 border-b border-[#E5DDD4] pb-6">
          <div>
            <h1 className="text-4xl font-serif text-[#1A1612]">Collections</h1>
            <p className="text-[#9C8E82] text-[10px] tracking-[0.3em] uppercase font-bold mt-1">Synced to Database</p>
          </div>
          <button 
            onClick={() => { reset(); setIsAddModalOpen(true); }}
            className="bg-[#C8571A] text-white px-6 py-2 rounded font-bold shadow-md hover:bg-[#A64614] transition-all"
          >
            + ADD ITEM
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <i className="fa-solid fa-spinner-third fa-spin text-4xl text-[#C8571A]"></i>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {todos.map((todo) => (
              <div key={todo._id} className="bg-white border border-[#F2E8E0] p-8 relative flex flex-col justify-between h-72 shadow-sm hover:shadow-xl transition-all group">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#C8571A] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#9C8E82] font-black italic">To-Do Item</span>
                  <h2 className="text-2xl font-serif text-[#1A1612] mt-3 mb-2">{todo.title}</h2>
                  <p className="text-[#5C5047] text-sm leading-relaxed line-clamp-3">"{todo.description}"</p>
                </div>

                <div className="flex gap-4 pt-6 border-t border-[#F2E8E0]">
                  <button 
                    onClick={() => deleteTodo(todo._id)} 
                    className="flex-1 py-2 text-[10px] font-bold text-[#9C8E82] border border-[#F2E8E0] hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    REMOVE
                  </button>
                  <button 
                    onClick={() => { 
                      setSelectedTodo(todo); 
                      setValue("title", todo.title); 
                      setValue("description", todo.description); 
                      setIsUpdateModalOpen(true); 
                    }}
                    className="flex-1 py-2 bg-[#1A1612] text-white text-[10px] font-bold hover:bg-black transition-all shadow-md"
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {(isAddModalOpen || isUpdateModalOpen) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1A1612]/60 backdrop-blur-sm">
          <div className="bg-[#F8F4EE] w-full max-w-md rounded shadow-2xl p-10 border border-[#E5DDD4]">
            <h3 className="text-3xl font-serif text-[#1A1612] mb-8">{isAddModalOpen ? "New Record" : "Edit Description"}</h3>
            
            <form onSubmit={handleSubmit(isAddModalOpen ? onAddSubmit : onUpdateSubmit)} className="space-y-6">
              {isAddModalOpen && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#9C8E82] uppercase tracking-tighter">Title</label>
                  <input {...register("title")} className="w-full bg-white border border-[#E5DDD4] p-3 rounded-none outline-none focus:border-[#C8571A]" />
                  {errors.title && <p className="text-red-500 text-[10px] italic">{errors.title.message}</p>}
                </div>
              )}
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#9C8E82] uppercase tracking-tighter">Description</label>
                <textarea {...register("description")} rows="4" className="w-full bg-white border border-[#E5DDD4] p-3 rounded-none outline-none focus:border-[#C8571A] resize-none" />
                {errors.description && <p className="text-red-500 text-[10px] italic">{errors.description.message}</p>}
              </div>

              <div className="flex gap-6 pt-4">
                <button type="button" onClick={() => { setIsAddModalOpen(false); setIsUpdateModalOpen(false); reset(); }} className="flex-1 text-[#5C5047] text-xs font-bold hover:underline">CLOSE</button>
                <button type="submit" className="flex-1 bg-[#C8571A] text-white py-3 font-bold text-xs shadow-lg">
                  {isAddModalOpen ? "CREATE" : "SAVE CHANGES"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}