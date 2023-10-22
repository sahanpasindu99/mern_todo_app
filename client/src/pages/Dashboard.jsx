import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';
import ListHeader from '../components/ListHeader';

function Dashboard() {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTaskTitle, setUpdatedTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const [showUserPopup, setShowUserPopup] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userInfo, setUserInfo] = useState({ _id: '', name: '', email: '', password: '' });

  const [sortOrder, setSortOrder] = useState('ascending');
  const [highlightToday, setHighlightToday] = useState(false);

  const [editingPassword, setEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`/get-items/${user?.email}`);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchUser = async () => {
    setLoadingUser(true);
    try {
      const response = await axios.get(`/get-users/${user?.email}`);
      setUserInfo({
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        password: response.data.password,
      });
      setCurrentPassword(response.data.password);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('An error occurred while fetching user information.');
    } finally {
      setLoadingUser(false);
    }
  };

  const handleDeleteItem = async (taskId) => {
    try {
      const response = await axios.delete(`/delete-item/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleUpdate = async (taskId) => {
    setLoading(true);
    try {
      if (!updatedTaskTitle) {
        toast.error('Field cannot be empty');
      } else {
        const response = await axios.put(`/update-item/${taskId}`, { title: updatedTaskTitle });
        const updatedTasks = tasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, title: response.data.title };
          }
          return task;
        });
        setTasks(updatedTasks);
        setEditingTaskId(null);
        setUpdatedTaskTitle('');
        toast.success('Task updated');
        fetchData();
      }
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('An error occurred while updating.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = (taskId, taskTitle) => {
    setEditingTaskId(taskId);
    setUpdatedTaskTitle(taskTitle);
  };

  const exitEditMode = () => {
    setEditingTaskId(null);
    setUpdatedTaskTitle('');
  };

  const showUserInfo = () => {
    fetchUser();
    setShowUserPopup(true);
  };

  const closeUserPopup = () => {
    setShowUserPopup(false);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
  };

  const toggleTodayHighlights = () => {
    setHighlightToday(!highlightToday);
    const today = new Date().toDateString();
    const updatedTasks = tasks.map((task) => {
      const taskDate = new Date(task.date).toDateString();
      if (taskDate === today) {
        return { ...task, isHighlighted: !highlightToday };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const toggleEditPassword = () => {
    setEditingPassword(!editingPassword);
  };

  const updatePassword = async () => {
    try {
      if (newPassword.length < 6 || !newPassword) {
        toast.error('Password must be at least 6 characters long and not empty');
      } else {
        setLoading(true);
        const response = await axios.post('/update-password', { email: user?.email, newPassword });
        toast.success('Password updated successfully');
        setEditingPassword(false);
        setCurrentPassword(newPassword);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('An error occurred while updating the password.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (sortOrder === 'ascending') {
      tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }, [sortOrder, tasks]);

  return (
    <div className="container mx-auto px-4">
      <div className="bg-black h-16 flex rounded-xl items-center justify-between px-4">
        <div className="text-3xl text-white font-bold flex-1 text-center">Welcome to MyTodo</div>
        <button
          onClick={showUserInfo}
          className="bg-[#0B0F12] hover:bg-[#2a2a2b] hover:scale-105 duration-200 border border-white text-white font-semibold rounded-lg py-2 px-6 text-sm mr-4"
        >
          {loadingUser ? 'Loading...' : 'User Profile'}
        </button>
      </div>
      {showUserPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-70 bg-gray-900">
          <div className="modal w-140 bg-white p-8 rounded-lg shadow-lg">
            <div className="mx-auto text-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-600">Profile Information</h2>
            </div>
            {loadingUser ? (
              <p className="text-center text-gray-600">Loading user information...</p>
            ) : (
              <div className="text-center">
                <div className="mb-4 ">
                  <label className="text-gray-600 text-sm">User ID:</label>
                  <p className="text-black font-semibold">{userInfo._id}</p>
                </div>
                <div className="mb-4">
                  <label className="text-gray-600 text-sm">Name:</label>
                  <p className="text-black font-semibold">{userInfo.name}</p>
                </div>
                <div className="mb-4">
                  <label className="text-gray-600 text-sm">Email:</label>
                  <p className="text-black font-semibold">{userInfo.email}</p>
                </div>
                <div className="mb-6">
                  <label className="text-gray-600 text-sm">Password:</label>
                  {editingPassword ? (
                    <div className="flex items-center">
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="w-full p-2 border rounded-lg text-black bg-white"
                      />
                      <button
                        onClick={updatePassword}
                        className={`ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg ${
                          loading ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                        disabled={loading}
                      >
                        {loading ? 'Updating...' : 'Update'}
                      </button>
                      <button
                        onClick={toggleEditPassword}
                        className="ml-2 px-4 py-2 bg-green-500  hover:bg-green-400 text-white rounded-lg"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-black font-semibold">{currentPassword}</span>
                      <button
                        onClick={toggleEditPassword}
                        className="ml-2 px-4 py-2 hover:bg-slate-400 bg-gray-700 text-white rounded-lg"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
                <div className="text-center">
                  <button
                    onClick={closeUserPopup}
                    className="bg-blue-600 hover:bg-blue-500 hover:scale-105 duration-200  text-white rounded-full py-2 px-6 text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <ListHeader fetchData={fetchData} />
      <div className="text-center mb-4 py-3 flex items-center justify-center">
        <button
          onClick={toggleSortOrder}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-2 px-6 text-sm mx-2 ${
            sortOrder === 'descending' ? 'bg-blue-700' : ''
          }`}
        >
          {sortOrder === 'ascending' ? 'Sort by New to Old' : 'Sort by Old to New'}
        </button>
        <button
          onClick={toggleTodayHighlights}
          className={`bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg py-2 px-6 text-sm mx-2 ${
            highlightToday ? 'bg-yellow-700' : ''
          }`}
        >
          {highlightToday ? 'Unhighlight Today' : 'Highlight Today'}
        </button>
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="w-1/2 mx-auto">
          <ul className="flex flex-col">
            {tasks.map((task) => (
              <li
                key={task._id}
                className={`mb-4 p-3 border rounded-lg hover:scale-105 duration-200  ${
                  task.isHighlighted && new Date(task.date).toDateString() === new Date().toDateString()
                    ? 'bg-yellow-100'
                    : 'bg-white'
                }`}
              >
                {editingTaskId === task._id ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={updatedTaskTitle}
                      onChange={(e) => setUpdatedTaskTitle(e.target.value)}
                      className="w-full p-2 border rounded-lg text-black bg-white"
                    />
                    <button
                      onClick={() => handleUpdate(task._id)}
                      className={`ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg ${
                        loading ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={exitEditMode}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="w-full text-black bg-white flex items-center justify-between">
                    <span className="flex-1 text-left">{task.title}</span>
                    <div>
                      <button
                        onClick={() => handleEditItem(task._id, task.title)}
                        className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(task._id)}
                        className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
