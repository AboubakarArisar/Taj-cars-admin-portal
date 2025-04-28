import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import {
  getAllContact,
  markAllAsRead,
  deleteContact,
} from "../services/admin.services";

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
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getAllContact()
      .then((data) => {
        setLoading(false);
        setMessages(data);
        setFilteredMessages(data);
      })
      .catch((error) => {
        console.error("ErrorsetRefresh(!refresh); fetching messages:", error);
        toast.error("Failed to fetch messages");
      });
  }, [refresh]);

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

  const handleDelete = (contactId) => {
    deleteContact(contactId)
      .then(() => {
        toast.success("Deleted message");
        setLoading(true);
        setRefresh(!refresh);
      })
      .catch((err) => toast.error("failed to delete message"));
  };

  const handleMarkAllRead = () => {
    markAllAsRead()
      .then(() => {
        toast.success("Marked all as read");
        setLoading(true);
        setRefresh(!refresh);
        setActiveTab("all");
      })
      .catch((err) => toast.error("failed to real all messages"));
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

      {activeTab === "unread" && filteredMessages.length > 0 && (
        <button
          onClick={handleMarkAllRead}
          className='absolute top-8 right-8 bg-[#1DCD9F] hover:bg-[#70f1cd] font-semibold duration-300  px-4 py-2 text-black rounded-lg cursor-pointer text-sm mt-2 '
        >
          Mark all as read
        </button>
      )}

      {loading ? (
        <Loader />
      ) : (
        <>
          {filteredMessages.length === 0 ? (
            <div className='flex justify-center items-center min-h-[60vh] '>
              <h2 className='text-xl text-gray-400'>No Messages Available</h2>
            </div>
          ) : (
            <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 '>
              {filteredMessages.map((msg) => (
                <div
                  key={msg._id}
                  className={`bg-[#1e1e1e] relative rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm p-5 flex flex-col gap-4 ${
                    msg.isRead
                      ? "border-l-4 border-green-500"
                      : "border-l-4 border-red-500"
                  }`}
                >
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className='absolute top-5 right-4 cursor-pointer'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      x='0px'
                      y='0px'
                      width='25'
                      height='25'
                      fill='brown'
                      viewBox='0 0 50 50'
                    >
                      <path d='M 21 0 C 19.355469 0 18 1.355469 18 3 L 18 5 L 10.1875 5 C 10.0625 4.976563 9.9375 4.976563 9.8125 5 L 8 5 C 7.96875 5 7.9375 5 7.90625 5 C 7.355469 5.027344 6.925781 5.496094 6.953125 6.046875 C 6.980469 6.597656 7.449219 7.027344 8 7 L 9.09375 7 L 12.6875 47.5 C 12.8125 48.898438 14.003906 50 15.40625 50 L 34.59375 50 C 35.996094 50 37.1875 48.898438 37.3125 47.5 L 40.90625 7 L 42 7 C 42.359375 7.003906 42.695313 6.816406 42.878906 6.503906 C 43.058594 6.191406 43.058594 5.808594 42.878906 5.496094 C 42.695313 5.183594 42.359375 4.996094 42 5 L 32 5 L 32 3 C 32 1.355469 30.644531 0 29 0 Z M 21 2 L 29 2 C 29.5625 2 30 2.4375 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4375 20.4375 2 21 2 Z M 11.09375 7 L 38.90625 7 L 35.3125 47.34375 C 35.28125 47.691406 34.910156 48 34.59375 48 L 15.40625 48 C 15.089844 48 14.71875 47.691406 14.6875 47.34375 Z M 18.90625 9.96875 C 18.863281 9.976563 18.820313 9.988281 18.78125 10 C 18.316406 10.105469 17.988281 10.523438 18 11 L 18 44 C 17.996094 44.359375 18.183594 44.695313 18.496094 44.878906 C 18.808594 45.058594 19.191406 45.058594 19.503906 44.878906 C 19.816406 44.695313 20.003906 44.359375 20 44 L 20 11 C 20.011719 10.710938 19.894531 10.433594 19.6875 10.238281 C 19.476563 10.039063 19.191406 9.941406 18.90625 9.96875 Z M 24.90625 9.96875 C 24.863281 9.976563 24.820313 9.988281 24.78125 10 C 24.316406 10.105469 23.988281 10.523438 24 11 L 24 44 C 23.996094 44.359375 24.183594 44.695313 24.496094 44.878906 C 24.808594 45.058594 25.191406 45.058594 25.503906 44.878906 C 25.816406 44.695313 26.003906 44.359375 26 44 L 26 11 C 26.011719 10.710938 25.894531 10.433594 25.6875 10.238281 C 25.476563 10.039063 25.191406 9.941406 24.90625 9.96875 Z M 30.90625 9.96875 C 30.863281 9.976563 30.820313 9.988281 30.78125 10 C 30.316406 10.105469 29.988281 10.523438 30 11 L 30 44 C 29.996094 44.359375 30.183594 44.695313 30.496094 44.878906 C 30.808594 45.058594 31.191406 45.058594 31.503906 44.878906 C 31.816406 44.695313 32.003906 44.359375 32 44 L 32 11 C 32.011719 10.710938 31.894531 10.433594 31.6875 10.238281 C 31.476563 10.039063 31.191406 9.941406 30.90625 9.96875 Z'></path>
                    </svg>
                  </button>
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
