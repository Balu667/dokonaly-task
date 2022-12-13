import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logInHandler } from "./AuthSlice";
import { useNavigate } from "react-router";
import { useHttpClient } from "../../core/store/hooks/htttp-hook";
import Loader from "../../components/Loader/Loader";
import "./Auth.css";

export const Auth = () => {
  const { apiCall, isLoading } = useHttpClient();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  const resetInputHandler = () => {
    setName("");
    setEmail("");
    setPassword("");
    setUserName("");
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const userDetails = {
      name,
      userName,
      email,
      password,
    };
    if (isLogin) {
      let userData = { email, password };
      
        dispatch(logInHandler(userData))
          .unwrap()
          .then((data) => {
            navigate("/dashboard");
          })
          .catch((err) => {
            alert(err.error);
          });
     
    } else {
      try {
        const response = await apiCall(
          "//localhost:4000/api/signup",
          "POST",
          JSON.stringify(userDetails),
          {
            "Content-Type": "application/json",
          }
        );

        if (response.error) {
          alert(response.error);
        } else {
          setIsLogin(!isLogin);
        }
      } catch (err) {
        console.log(err);
      }
    }
    
    resetInputHandler()

  };

  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-section">
      {isLoading ? (
        <Loader asOverlay />
      ) : (
        <form onSubmit={submitHandler}>
          <h2>{isLogin ? "Login to App" : "Register to App"}</h2>
          {!isLogin && <label>Fullname</label>}
          {!isLogin && (
            <input required
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
            />
          )}
          {!isLogin && <label>Username</label>}
          {!isLogin && (
            <input
              required
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              value={userName}
            />
          )}
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
          />
          <label>Password</label>
          <input
            required
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {/* <div className="error">{password.length > 5 ? "": "Minium six characters required"}</div> */}
          <button type="submit" disabled={isLogin ? !email || !password : !email || !password || !name || !userName}>
            Submit
          </button>
          <div className="flex-container">
            <p>
              {isLogin ? "New user Please ,  " : "Already Register Please,"}
            </p>
            <a href="#" onClick={switchModeHandler}>
              {isLogin ? "Register" : "Login"}
            </a>
          </div>
        </form>
      )}
    </div>
  );
};
