import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { be_api } from "../api/api";
// import { setUser } from "../modules/auth/auth.slice";

import { fetchAllTopics } from "../modules/topic.slice";

const User = () => {

  // get user from Redux
  const user = useSelector((state) => state.auth.user);
  const { topics, loading } = useSelector((state) => state.topics);

  const dispatch = useDispatch();

  const [selectedTopics, setSelectedTopics] = useState([]);
//   const [loadingTopics, setLoadingTopics] = useState(false);
  const [saving, setSaving] = useState(false);


    useEffect(() => {
        if (user && !user.preferenceCompleted) {
            dispatch(fetchAllTopics());
        }
    }, [user, dispatch]);


  const toggleTopic = (topicId) => {
    if (selectedTopics.includes(topicId)) {
      setSelectedTopics(
        selectedTopics.filter(id => id !== topicId)
      );
    } else {
      setSelectedTopics(
        [...selectedTopics, topicId]
      );
    }
  };

  const savePreferences = async () => {
    try {
      setSaving(true);
      console.log("Saving preferences for topics:", selectedTopics);
    //   await be_api.user.savePreferences(selectedTopics);
      // get updated user
    //   const updatedUser = await be_api.user.getMe();
      // update Redux
    //   dispatch(setUser(updatedUser));
    } catch (err) {
      console.error(err);
      alert("Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border"/>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* User info */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h3>Welcome, {user.name}</h3>
          <p>{user.email}</p>
          {user.preferenceCompleted ? (
            <span className="badge bg-success">
              Preferences Completed
            </span>
          ) : (
            <span className="badge bg-warning text-dark">
              Preferences Required
            </span>
          )}
        </div>
      </div>

      {/* Topics */}
      {!user.preferenceCompleted && (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5>Select your interests</h5>
            {loading ? (
              <div className="spinner-border"/>
            ) : (
              <div className="row">
                {topics.map(topic => (
                  <div
                    key={topic.id}
                    className="col-md-4 mb-2"
                  >
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={topic.id}
                        onChange={() =>
                          toggleTopic(topic.slug)
                        }
                      />
                      <label htmlFor={topic.id}>
                        {topic.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              className="btn btn-success mt-3"
              onClick={savePreferences}
              disabled={
                saving ||
                selectedTopics.length === 0
              }
            >
              {saving ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </div>
      )}
    </div>

  );

};

export default User;
