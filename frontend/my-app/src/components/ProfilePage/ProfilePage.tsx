import React, { useEffect, useState } from "react";
import NavigationSidebar from "../NavigationSidebar/NavigationSidebar";
import SettingsSidebar from "../SettingsSidebar/SettingsSidebar";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../config";
import ChatComponent from "../ChatComponent/ChatComponent";
import UserProfile from "./UserProfile";
import CompanyDetails from "../CompanyDetails/CompanyDetails";

type userDataType = {
  _id: string;
  lastname: string;
  firstname: string;
  plan: string;
  email: string;
  password: string;
};

const ProfilePage = () => {
  const [selected, setSelected] = useState("profile");
  return (
    <div className="flex flex-row content-evenly h-screen justify-start">
      <div className="flex flex-row ">
        <NavigationSidebar />
        <SettingsSidebar selected={selected} setSelected={setSelected} />
      </div>
      {selected === "profile" ? <UserProfile /> : <></>}
      {selected === "company" ? <CompanyDetails /> : <></>}
    </div>
  );
};

export default ProfilePage;
