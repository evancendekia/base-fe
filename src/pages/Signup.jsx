import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { registerUser } from "../modules/auth.slice";

const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password mismatch",
        text: "Passwords do not match",
        confirmButtonColor: "#198754",
      });
      return;
    }

    const result = await dispatch(
      registerUser({
        email,
        password,
        name: username,
      })
    );

    if (result.meta.requestStatus === "fulfilled") {

      await Swal.fire({
        icon: "success",
        title: "Signup successful!",
        text: "Welcome to our platform",
        confirmButtonText: "Go to Dashboard",
        confirmButtonColor: "#198754",
      });

      // redirect after clicking OK
      navigate("/user");

    } else {

      Swal.fire({
        icon: "error",
        title: "Signup failed",
        text: result.payload || "Something went wrong",
        confirmButtonColor: "#dc3545",
      });

    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
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

              {/* Button */}
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>

                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="link-primary">
                    Sign In
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
              alt="Signup"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
