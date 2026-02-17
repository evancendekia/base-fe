import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../modules/auth.slice";
import "../Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: email, password: password }));
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          
          {/* Left image */}
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://cdn.evancendekia.com/sign-in-light.png"
              className="img-fluid"
              alt="Login"
            />
          </div>

          {/* Login form */}
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleLogin}>

              <h3 className="mb-5">Login to Your Account</h3>
              {/* Email */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="form-outline mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Remember me */}
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                  />
                  <label className="form-check-label">
                    Remember me
                  </label>
                </div>

                <a href="#" className="text-body">
                  Forgot password?
                </a>
              </div>

              {/* Login button */}
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100"
                >
                  Login
                </button>

                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                

                    <Link
                        to="/signup"
                        className="link-success"
                    >
                        Register
                    </Link>
                </p>
              </div>

            </form>
          </div>

        </div>
      </div>
      
    </section>
    );

};

export default Login;
