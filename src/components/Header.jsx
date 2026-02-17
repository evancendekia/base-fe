import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../modules/auth.slice";

const Header = () => {
  // const user = useSelector((state) => state.auth.user);
  // console.log("Current user in Header:", user); // Debug log to check user state

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // optional redirect after logout
  };

  return (
    <>
      <div className="top-bar"></div>

      <header className="custom-header py-3">
        <div className="container d-flex justify-content-between align-items-center">

          <Link to="/" className="text-decoration-none">
            <h2 className="brand-title">Articles Website</h2>
          </Link>

          <div className="d-flex align-items-center">
            {user ? (
              <div className="dropdown">
                <div
                  className="d-flex align-items-center"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={`https://cdn.evancendekia.com/default-profile.png`}
                    alt="avatar"
                    width="36"
                    height="36"
                    className="rounded-circle"
                  />

                  <span className="ms-2 text-success fw-semibold">
                    {user.name || user.email}
                  </span>
                </div>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link to="/user" className="dropdown-item">
                      My Profile
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-success nav-btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
