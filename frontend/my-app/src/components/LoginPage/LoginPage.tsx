import { FormEvent, useContext, useState } from "react"
import { globalStateContext } from "../../App"
import axios from "axios"
import { baseURL, getTokenURI } from "../../config"
import { Navigate, Route, redirect, useNavigate } from "react-router-dom"

export default function LoginPage() {

  const {token, setToken, expires, setExpires} = useContext(globalStateContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const str = String(value);
    setEmail(str);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const str = String(value);
    setPassword(str);
  };

  type tokenType = {
    Authorization: string,
    expires: number
  }
  
  const loginPost = async (event: FormEvent
    ) => {
    event.preventDefault()
    try {
      const res = await axios.post("http://localhost:3001/login", {email: email, password: password});
      setToken(res.data.Authorization)
      setExpires(res.data.expires)
      localStorage.setItem("token", JSON.stringify(res.data.Authorization))
      // if (!localStorage.getItem("token")){
      //   localStorage.setItem("token", JSON.stringify(res.data.Authorization))
      //   console.log(JSON.stringify(res.data.Authorization))
      // }
      // const refresh = setTimeout(()=>{
      //   setToken("")
      //   setExpires(-1)
      //   localStorage.removeItem("token")
      //   navigate("/")
      //   axios.get("http://localhost:3001/logout")
      //   }, (res.data.expires - (Math.floor(Date.now() / 1000))) * 1000)
      navigate("/welcomePage")
    } catch (err) {
      console.log(err);
    }
  };

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={loginPost
        
            } className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleEmailChange}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handlePasswordChange}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="/signUpPage" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                sign up
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  