import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {logIn} from './AuthSlice';
import './Auth.css';

export const Auth = () => {
    const [name,setName] = useState("");
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isLogin,setIsLogin] = useState(false);

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        const userDetails = {
            name,
            userName,
            email,
            password
        }
        if(isLogin){
          let userData = {email,password}
            // try{
            //   await dispatch(logIn(JSON.stringify(userData)))
            // }catch(err){
            //     console.log(err)
            // }
          const response = await fetch("//localhost:4000/api/login",{
              method:"POST",
              headers:{
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(userData)
          });
          const data = await response.json();
          if(data.error){
              alert(data.error)
          }
          console.log(data);
        }else{
         
            const response = await fetch("//localhost:4000/api/signup",{
                method:"POST",
                headers:{
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify(userDetails)
            });
            const data = await response.json();
            if(data.error){
                alert(data.error)
            }
            console.log(data);
        }
        console.log(userDetails,"user details");
        setName("");
        setEmail("");
        setPassword("");
        setUserName("");
    }

    const switchModeHandler = () => {
        setIsLogin(!isLogin);
    }
    console.log(!email && !password)
    return (
        <div className="auth-section">
            <form onSubmit={submitHandler}>
             <h2>{isLogin ? "Login to App" : "Register to App"}</h2>
               {!isLogin && <label>Fullname</label>}
              {!isLogin && <input onChange={(e) => setName(e.target.value)} type="text" value={name} />}
               {!isLogin && <label>Username</label>}
               {!isLogin && <input onChange={(e) => setUserName(e.target.value)} type="text" value={userName} />}
                <label>Email</label>
              <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
               <label>Password</label>
               <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} />
               <button type="submit" disabled={!email || !password}>Submit</button>
               <div className="flex-container">
                   <p>{isLogin ? "Already Register Please  " : "New user Please"}</p>
                   <a href="#" onClick={switchModeHandler}>{isLogin ? "Register" : "Login"}</a>
               </div>
               {/* <p>Already Register Pease </p> */}
            </form>
        </div>
    )
}
