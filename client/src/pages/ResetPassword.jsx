import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function ResetPassword() {
  const navigate = useNavigate();
  const { id, token } = useParams();

  const [data, setData] = useState({
    newPassword: '',
    reNewPassword: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const ResetPassword = async (e) => {
    e.preventDefault();
    try {
      const { newPassword, reNewPassword } = data;

      if ( newPassword === reNewPassword) {
        setLoading(true);
        const response = await axios.post(`/reset-password/${id}/${token}`, {
          newPassword,
        });
       
        if (response.status===200) {
          toast.success('Password changed');
          setData({ newPassword: '', reNewPassword: '' });
                    navigate('/login');
        }
        else {
          toast.error("Password has not changed");

        }
      } else {
        toast.error('Passwords must be the same');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl text-center font-semibold mb-4">Reset Password</h1>
        <form onSubmit={ResetPassword}>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border rounded-lg"
              type="password"
              placeholder="Enter new password"
              onChange={(e) =>
                setData({ ...data, newPassword: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border rounded-lg"
              type="password"
              placeholder="Re-enter new password"
              onChange={(e) =>
                setData({ ...data, reNewPassword: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 bg-blue-500 text-white rounded-lg ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
