import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const [nama, setNama] = useState("");
  const [pass, setPass] = useState("");
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();

  const formData = {
    username:nama,
    password:pass,
  }

  const onChangeData = (e) => {
    const { name, value } = e.target;
    if (name === "UsernameField") setNama(value);
    if (name === "PasswordField") setPass(value);
  };

  const cekUser = async () => {
    try{
      const response = await axios.post("http://localhost:8080/api/users/login",formData);
      if(response.status == 200 || response.success == true){
        setLogin(true);
        return true;
      }else{
        setLogin(false);
        return false;
      }
    }catch(err){
      alert("gagal login!");
      return false;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // penting!
    let response = await cekUser();
    if(response || isLogin){
      alert("Berhasil Login!");
      navigate("/dashboard");
    }else{
      alert("Gagal Login! Mungkin ada masalah");
    }
  };

  const onRegister = () => {
    navigate("/register");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Login</h2>
          <p className="mt-2 text-sm text-gray-600">Masukkan kredensial untuk akses dashboard</p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="UsernameField"
                  type="text"
                  required
                  value={nama}
                  onChange={onChangeData}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="PasswordField"
                  type="password"
                  required
                  value={pass}
                  onChange={onChangeData}
                  placeholder="Masukkan password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={onSubmit}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
          <div>
            <button
              onClick={onRegister}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <a className="text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
            Lupa password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;