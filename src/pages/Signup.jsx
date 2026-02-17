import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../modules/auth.slice";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup form submitted with:", {
      username,
      email,
      password,
      confirmPassword,
    });
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("testing"); // Debug log to check if we reach this point
    const result = await dispatch(
      registerUser({
        email,
        password,
        name: username,
      }),
    );

    if (result.meta.requestStatus === "fulfilled") {
      alert("Signup success!");
    }
  };

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          {/* Login form */}
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <h3 className="mb-5">Sign up with email</h3>
              {/* Name */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
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
              <div className="form-outline mb-4">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* Confirm Password */}
              <div className="form-outline mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* Login button */}
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-success btn-lg w-100" disabled={loading} >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>

                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="link-primary">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Right image */}
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://cdn.evancendekia.com/sign-up-light.png"
              className="img-fluid"
              alt="Login"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
