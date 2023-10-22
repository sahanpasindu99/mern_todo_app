import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

const ListHeader = (props) => {
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, signOut } = useContext(UserContext);

  const saveNewTask = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      if (!newTask || newTask.length === 0) {
        toast.error("Task cannot be empty");
      } else {
        const data = await axios.post('/save-item', {
          email: user.email,
          newTask: newTask,
        });

        if (data.error) {
          toast.error(data.error);
        } else {
          props.fetchData();
          toast.success('New Task Added');
          setNewTask('');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while adding.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mb-4 mt-5'>
      <div className="w-full max-w-md flex items-center justify-between">
        <input
          className='w-3/4 p-2 border rounded-md'
          placeholder='Enter New Task..'
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
        <button
          className={`mx-2 py-2 bg-blue-700 w-1/4 text-white hover:scale-105 duration-200  rounded-lg ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={saveNewTask}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add New'}
        </button>
      </div>
      <button className='mt-4 px-4 py-2 hover:scale-105 duration-200  bg-black text-white rounded-lg' onClick={signOut}>
        Log Out
      </button>
    </div>
  );
};

export default ListHeader;
