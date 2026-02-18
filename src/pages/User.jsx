import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { be_api } from "../api/api";
import { setUser } from "../modules/auth.slice";
import { formatDate } from "../utils/date.utils";

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
      setSelectedTopics(selectedTopics.filter((id) => id !== topicId));
    } else {
      setSelectedTopics([...selectedTopics, topicId]);
    }
  };

  const savePreferences = async () => {
    try {
      setSaving(true);
      await be_api.user.savePreferences(selectedTopics);
      const updatedUser = await be_api.user.getProfile();
      dispatch(setUser(updatedUser));
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
        <div className="spinner-border" />
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
            <div>
                User preference : {user.preferences.map(p => (<span className="badge bg-success mx-2">{p.name}</span>))}
            </div>
            // <span className="badge bg-success">Preferences Completed</span>
          ) : (
            <span className="badge bg-warning text-dark">
              Preferences Required
            </span>
          )}
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Subscription Details</h5>

            {user.isPremiumActive ? (
              <span className="badge bg-success">ACTIVE</span>
            ) : (
              <span className="badge bg-secondary">INACTIVE</span>
            )}
          </div>

          {user.subscription ? (
            <div className="row">
              <div className="col-md-4 mb-2">
                <small className="text-muted">Plan</small>
                <div className="fw-semibold">{user.subscription.planType}</div>
              </div>

              <div className="col-md-4 mb-2">
                <small className="text-muted">Start Date</small>
                <div>{formatDate(user.subscription.startDate)}</div>
              </div>

              <div className="col-md-4 mb-2">
                <small className="text-muted">End Date</small>
                <div>{formatDate(user.subscription.endDate)}</div>
              </div>
            </div>
          ) : (
            <p className="text-muted">No active subscription.</p>
          )}
        </div>
      </div>

      {/* Topics */}
      {!user.preferenceCompleted && (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5>Select your interests</h5>
            {loading ? (
              <div className="spinner-border" />
            ) : (
              <div className="row">
                {topics.map((topic) => (
                  <div key={topic.id} className="col-md-4 mb-2">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={topic.id}
                        onChange={() => toggleTopic(topic.slug)}
                      />
                      <label htmlFor={topic.id}>{topic.name}</label>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              className="btn btn-success mt-3"
              onClick={savePreferences}
              disabled={saving || selectedTopics.length === 0}
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
