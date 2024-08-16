import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginModal.css";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";

const LoginModal = () => {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const handleUserTypeChange = (e) => setUserType(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleCaptchaChange = (e) => setCaptchaInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic here
    console.log({ userType, username, password, captchaInput });
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
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={handleUsernameChange}
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

            <div className="mb-3">
              <label className="form-label">Captcha</label>
              <div className="d-flex align-items-center">
                <div className="captcha bg-light p-2 border">8, 3, 5, 4, 1</div>
                <input
                  type="text"
                  className="form-control ms-2"
                  value={captchaInput}
                  onChange={handleCaptchaChange}
                  placeholder="Enter Captcha"
                  required
                />
              </div>
            </div>

            <button type="button" className="buttn btn btn-secondary">
              Back to Home
            </button>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
