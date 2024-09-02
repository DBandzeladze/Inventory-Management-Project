import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import PurchasePage from "./components/PurchasePage/PurchasePage";
import { createBrowserRouter, RouterProvider, Route, useNavigate, redirect } from "react-router-dom";
import AddItemPage from "./components/AddItemPage/AddItemPage";
import ItemsPage from "./components/ItemsPage/ItemsPage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import axios from "axios";
import { baseURL, getTokenURI } from "./config";
import Router from "./components/Router";




type tokenType = {
  Authorization: string,
  expires: number
}

const getToken = async (): Promise<tokenType> => {
  try {
    const response = await axios.get<tokenType>(getTokenURI);
    return response.data;
  } catch (err) {
    console.log(err);
    return {Authorization: "", expires: -1}
  }
};
type contextType = {
  token: string,
  setToken: Dispatch<SetStateAction<string>>,
  expires: number,
  setExpires: Dispatch<SetStateAction<number>>
}
const defaultdispatchNumber:
Dispatch<SetStateAction<number>>= ()=> {}
const defaultdispatchString:
Dispatch<SetStateAction<string>>= ()=> {}
const defaultValue = {
  token: "",
  setToken: defaultdispatchString,
  expires: -1,
  setExpires: defaultdispatchNumber
}

export const globalStateContext = React.createContext<contextType>(defaultValue)

function App() {
  const [token, setToken] = useState("")
  const [expires, setExpires] = useState(-1)

  
    return (
      <div> <globalStateContext.Provider value={{token, setToken, expires, setExpires}}><Router/>
      </globalStateContext.Provider>
      </div>
    )

}

export default App;
