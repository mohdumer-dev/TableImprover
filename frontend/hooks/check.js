import { useEffect, useState } from "react";
import axios from "axios";

async function sendData(user) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/check`, {
      user: user,
    });
    console.log(response.data.message);
    return response.data.message;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// ✅ custom hook
function useCheck(user) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!user) return; // avoid running with empty user
    const fetchData = async () => {
      const result = await sendData(user);
      setMessage(result);
    };
    fetchData();
  }, [user]);

  return message;
}

export default useCheck;
