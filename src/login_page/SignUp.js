import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {

   const [firstname,setfirsname] = useState("");
   const [lastname,setlastname] = useState("");
   const [password,setpassword] = useState("");
   const [isSignUp, setSignUp] = useState(false);

   const newUsers = {
      password:password,
      firstName:firstname,
      lastName:lastname,
   }

   const navigate = useNavigate();

   const fieldChange = (event) => {
      const {name, value} = event.target;
      
      if (name === "firstNameField"){
         setfirsname(value);
      }else if (name === "lastNameField"){
         setlastname(value);
      }else if (name === "passwordField"){
         setpassword(value);
      }
   }

   const clickSigUp = async () => {
      // axios.post("http://localhost:8080/api/users/register", newUsers)
      // .then((response) =>{
      //    if(response.data.success){
      //       setSignUp(true);
      //    }else{
      //       setSignUp(false);
      //    }
      // })
      // .catch((err) => {

      // });
      try{
         const response = await axios.post("http://localhost:8080/api/users/register",newUsers);
         if(response.data.success){
            setSignUp(true);
            setfirsname("");
            setlastname("");
            setpassword("");
         }else{
            setSignUp(false);
         }
      }catch(err){
         console.error("Registration failed:", err);
         if (err.response && err.response.data) {
            setSignUp(false);
         } else {
            alert("Terjadi kesalahan. Coba lagi nanti.");
         }
      }

   }

   const clickBack = () => {
      navigate("/");
   }

   return (
      <div>
         <label>First Name</label><input value={firstname} name="firstNameField" onChange={fieldChange}/>
         <label>Last Name</label><input value={lastname} name="lastNameField" onChange={fieldChange}/><br/>
         <label>Password</label><input value={password} name="passwordField" onChange={fieldChange}/><br/>
         <button type="button" onClick={clickSigUp}>Sign Up</button><br/>
         <button type="button" onClick={clickBack}>Kembali</button>
         {isSignUp ? <p>Sign Up Berhasil!!</p> :<p>Mohon isi semuanya untuk mendaftar!</p>}
      </div>
   );
}

export default SignUpPage;