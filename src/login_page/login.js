import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; // harus seperti ini!!
import SignUpPage from "./SignUp";
import DashboardHome from "../dashboard_page/dashboard";

const LoginComponent = () => {
   return(
      <Router>
         <Routes>
            <Route path="/" element={<WindowLogin/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/dashboard" element={<DashboardHome/>}/>
         </Routes>
      </Router>
   );
}
export default LoginComponent; 

const WindowLogin = () => {
   // const [dataForm, setDataForm] = useState({
   //    nama:"",
   //    pass:"",
   // });
   const [nama,setNama] = useState("");
   const [pass,setPass] = useState("");
   const [isLogin, setLogin] = useState(false);

   const arrName = nama.split(" ");
   const firstname = arrName[0];
   const lastname = arrName[1];

   const postValue = {
      password:pass,
      firstName:firstname,
      lastName:lastname,
   }

   const navigate = useNavigate();

   const onChangeData = (event) => {
      const {name,value} = event.target;
      if(name === "UsernameField"){
         setNama(value);
      }else if(name === "PasswordField"){
         setPass(value);
      }
   }

   const onlogin = async () => {
      try{
         const response = await axios.post("http://localhost:8080/api/users/login",postValue);
         if(response.data.success){
            setLogin(true);
            setNama("");
            setPass("");
         }else{
            setLogin(false);
         }

      }catch(err){
         console.error("Registration failed:", err);
         if (err.response && err.response.data) {
            setLogin(false);
         } else {
            alert("Terjadi kesalahan. Coba lagi nanti.");
         }
      }
      
      if(isLogin){
         navigate("/dashboard");
      }
   }

   const clickSignUp = () => {
      navigate("/signup");
   }

   return(
      <div>
         <form>
            <label>Username: </label>
            <input type="text" value={nama} name="UsernameField" placeholder="Username : firstname + lastname" onChange={onChangeData}/><br/>
            <label>Password: </label>
            <input type="text" value={pass} name="PasswordField" placeholder="Password" onChange={onChangeData}/><br/>
            <button type="button" onClick={onlogin}>Log In</button><br/>
            <button type="button" onClick={clickSignUp}>Sign Up</button>
         </form>
      </div>
   );
}