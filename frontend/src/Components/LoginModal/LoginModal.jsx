import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginModal.css";
import {Link ,  useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import  toast from "react-hot-toast";


const LoginModal = () => {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const handleUserTypeChange = (e) => setUserType(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleBackToHome = () => {
    navigate("/"); // Navigate to home page
  };



  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:4001/api/user/login', { email, password, username });

      if (response.data.success) {
        toast.success("Login successful!");
        console.log("Login successful", response.data);
        setUser({username})
        
        // Redirect based on user type
        if (userType === "student") {
          navigate('/form');
        } else if (userType === "staff") {
          navigate('/facultyForm');
        } else {
          console.error("Invalid user type.");
        }
      } else {
        console.error(response.data.msg);
        toast.error(response.data.msg || "User does not exist. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };


  return (
    <div className="outer-div d-flex justify-content-center align-items-center vh-100">
      <div className="inner-div row">
        <div className="col">
          <h4 className="main-heading">USER LOGIN</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Select User Type</label>
              <select
                className="form-select"
                value={userType}
                onChange={handleUserTypeChange}
                required
              >
                <option value="">--Select User Type--</option>
                <option value="student">Student, LNMIIT</option>
                <option value="staff">Staff, LNMIIT</option>
                <option value="alumni">Alumni, LNMIIT</option>
                <option value="admni">Guest House Admin</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            
            <div className="btn-container">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <button type="button" className=" btn btn-secondary"
                onClick={handleBackToHome} >
                Back to Home
              </button>
            </div>            
            <div className="mt-1">
              <p style={{ color:"black"}}>
                Don't have an account?{" "}
                <Link to="/register">Register here</Link> {/* Link to the register page */}
              </p>
            </div>
          </form>
            {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
