import React, { FormEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutURI } from "../../config";
import axios from "axios";
import { globalStateContext } from "../../App";

const LogoutButton: React.FC = () => {
const {token, expires, setToken, setExpires} = useContext(globalStateContext)
const navigate = useNavigate()
  const handleSignOut = async (event: FormEvent
    ) => {
    event.preventDefault()
    try {
      const res = await axios.get(logoutURI);
      setToken("")
      setExpires(-1)
      if (localStorage.getItem("token")){
        localStorage.removeItem("token")
      }
      navigate("/")
      console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button onClick={handleSignOut} 
    className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
      Log Out
    </button>
  );
};

export default LogoutButton;
