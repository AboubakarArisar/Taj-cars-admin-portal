import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { getAllContact } from "../services/admin.services";

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-60'>
      <div className='w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin'></div>
    </div>
  );
};

const ViewContact = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllContact()
      .then((data) => {
        setLoading(false);
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        toast.error("Failed to fetch messages");
      });
  }, []);

  return (
    <div className='min-h-screen relative w-full bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10'>
      <Toaster />
      <h1 className='text-4xl font-bold mb-10 text-center'>Messages</h1>
      <button
        onClick={() => navigate("/dashboard")}
        className='absolute top-4 left-6 cursor-pointer px-3 py-2 bg-[#1DCD9F] text-black font-semibold rounded-xl hover:bg-[#17b58b] transition-all duration-300'
      >
        {"<-"}
      </button>

      {loading ? (
        <Loader />
      ) : (
        <>
          {messages.length === 0 ? (
            <div className='flex justify-center items-center min-h-[60vh]'>
              <h2 className='text-xl text-gray-400'>No Messages Available</h2>
            </div>
          ) : (
            <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className='bg-[#1e1e1e] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm p-5 flex flex-col gap-4'
                >
                  <div>
                    <h3 className='text-lg font-semibold mb-2 break-words'>
                      Name: {msg.name}
                    </h3>
                    <p className='text-gray-400 text-sm mb-1 break-words'>
                      Email: {msg.email}
                    </p>

                    <p className='text-gray-300 break-words'>{msg.message}</p>
                  </div>
                  <div className='text-right text-xs text-gray-500'>
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewContact;
