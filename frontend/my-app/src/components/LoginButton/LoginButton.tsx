import React from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {

  return (
    <div>
      <Link
        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        to="/purchasePage"
      >
        go to purchase page
      </Link>
    </div>
  );
};

export default LoginButton;
