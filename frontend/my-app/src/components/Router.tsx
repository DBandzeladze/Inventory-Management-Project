import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AddItemPage from "./AddItemPage/AddItemPage";
import ItemsPage from "./ItemsPage/ItemsPage";
import LoginPage from "./LoginPage/LoginPage";
import PurchasePage from "./PurchasePage/PurchasePage";
import SignUpPage from "./SignUpPage/SignUpPage";
import WelcomePage from "./WelcomePage/WelcomePage";
import { globalStateContext } from "../App";
import ChangeHistory from "./ChangeHistory/ChangeHistory";
import CheckoutTest from "./CheckoutTest/CheckoutTest";
import AllItems from "./AllItems/AllItems";
import IndividualItemPage from "./IndividualItemPage/IndividualItemPage";
import AllItemsWithGrid from "./GridItemTest/AllItemsWithGrid";
import { EmailPage } from "./EmailPage/EmailPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import CompanyDetails from "./CompanyDetails/CompanyDetails";

const Router = () => {
  const { token } = useContext(globalStateContext);
  const [loggedIn, setLoggedIn] = useState(false);
  // useEffect(()=>{
  //     if (token === "" || token === null){
  //         setLoggedIn(false)
  //     } else {
  //         setLoggedIn(true)
  //         console.log(token)
  //     }
  // }, [token])
  const checkLoggedIn = () => {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("token") !== "undefined") {
        if (localStorage.getItem("token") !== null) {
          if (localStorage.getItem("token") !== "") {
            console.log(localStorage.getItem("token"));
            return true;
          }
        }
      }
    }
    return false;
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signUpPage" element={<SignUpPage />} />
          <Route path="/checkout" element={<CheckoutTest />} />
          <Route
            path="/purchasePage"
            element={
              checkLoggedIn() ? <PurchasePage /> : <Navigate replace to={"/"} />
            }
          />
          <Route
            path="/welcomePage"
            element={
              checkLoggedIn() ? <WelcomePage /> : <Navigate replace to={"/"} />
            }
          />
          <Route
            path="/ItemsPage"
            element={
              checkLoggedIn() ? <ItemsPage /> : <Navigate replace to={"/"} />
            }
          />
          <Route
            path="/AllItems"
            element={
              checkLoggedIn() ? <AllItems /> : <Navigate replace to={"/"} />
            }
          />
          <Route
            path="/Grid"
            element={
              checkLoggedIn() ? (
                <AllItemsWithGrid />
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="/history"
            element={
              checkLoggedIn() ? (
                <ChangeHistory />
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="/individual"
            element={
              checkLoggedIn() ? (
                <IndividualItemPage />
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="/settings"
            element={
              checkLoggedIn() ? <ProfilePage /> : <Navigate replace to={"/"} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
