import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; // harus seperti ini!!

const LoginComponent = () => {
   return(
      <Router>
         <Routes>
            <Route path="/" element={<WindowLogin/>}/>
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


   const navigate = useNavigate();

   const onChangeData = (event) => {
      const {name,value} = event.target;

      // if(name === "UsernameField"){
      //    setDataForm((prev) => ({
      //       ...prev,
      //       nama: value,
      //    }));
      // }else if (name === "PasswordField"){
      //    setDataForm((prev) => ({
      //       ...prev,
      //       pass: value,
      //    }));
      // }

      if(name === "UsernameField"){
         setNama(value);
      }else if(name === "PasswordField"){
         setPass(value);
      }
   }

   const onSubmit = () => {
      // if(dataForm.nama === "Ryandy" && dataForm.pass === "ty0055"){
      //    navigate("/dashboard");
      // }
      if(nama === "Ryandy" && pass === "ty0055"){
         navigate("/dashboard");
      }
   }

   return(
      <div>
         <form onSubmit={onSubmit}>
            <label>Username: </label>
            <input type="text" value={nama} name="UsernameField" placeholder="Username" onChange={onChangeData}/><br/>
            <label>Password: </label>
            <input type="text" value={pass} name="PasswordField" placeholder="Password" onChange={onChangeData}/><br/>
            <button type="submit">Log In</button>
         </form>
      </div>
   );
}

const DashboardHome = () => {
   const navigate = useNavigate();
   return (
      <div>
         <h1>Home Page DashBoard</h1>
         <button type="button" onClick={() => navigate("/")}>Log Out</button>
      </div>
   );
}
