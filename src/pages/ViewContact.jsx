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
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    getAllContact()
      .then((data) => {
        setLoading(false);
        setMessages(data);
        setFilteredMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        toast.error("Failed to fetch messages");
      });
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "all") {
      setFilteredMessages(messages);
    } else {
      setFilteredMessages(
        messages.filter((msg) => (tab === "read" ? msg.isRead : !msg.isRead))
      );
    }
  };

  const getTabCount = (tab) => {
    if (tab === "all") return messages.length;
    return messages.filter((msg) => (tab === "read" ? msg.isRead : !msg.isRead))
      .length;
  };
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

      <div className='flex justify-center gap-6 mb-8'>
        <button
          onClick={() => handleTabClick("all")}
          className={`px-6 py-2 text-lg font-semibold cursor-pointer rounded-lg ${
            activeTab === "all"
              ? "bg-[#1DCD9F] text-black"
              : "bg-transparent text-gray-400 hover:bg-[#1DCD9F] hover:text-black"
          }`}
        >
          All ({getTabCount("all")})
        </button>
        <button
          onClick={() => handleTabClick("read")}
          className={`px-6 py-2 text-lg font-semibold cursor-pointer rounded-lg ${
            activeTab === "read"
              ? "bg-[#1DCD9F] text-black"
              : "bg-transparent text-gray-400 hover:bg-[#1DCD9F] hover:text-black"
          }`}
        >
          Read ({getTabCount("read")})
        </button>
        <button
          onClick={() => handleTabClick("unread")}
          className={`px-6 py-2 text-lg font-semibold cursor-pointer rounded-lg ${
            activeTab === "unread"
              ? "bg-[#1DCD9F] text-black"
              : "bg-transparent text-gray-400 hover:bg-[#1DCD9F] hover:text-black"
          }`}
        >
          Unread ({getTabCount("unread")})
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          {filteredMessages.length === 0 ? (
            <div className='flex justify-center items-center min-h-[60vh]'>
              <h2 className='text-xl text-gray-400'>No Messages Available</h2>
            </div>
          ) : (
            <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
              {filteredMessages.map((msg) => (
                <div
                  key={msg._id}
                  className={`bg-[#1e1e1e] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm p-5 flex flex-col gap-4 ${
                    msg.isRead
                      ? "border-l-4 border-green-500"
                      : "border-l-4 border-red-500"
                  }`}
                >
                  <div>
                    <h3 className='text-lg font-semibold mb-2 break-words'>
                      Name: {msg.name}
                    </h3>
                    <p className='text-gray-400 text-sm mb-1 break-words'>
                      Email: {msg.email}
                    </p>
                    <button
                      onClick={() => navigate(`/message/${msg._id}`)}
                      className='bg-[#1DCD9F] hover:bg-[#70f1cd] font-semibold duration-300  px-4 py-2 text-black rounded-lg cursor-pointer text-sm mt-2 '
                    >
                      Show Message
                    </button>
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
