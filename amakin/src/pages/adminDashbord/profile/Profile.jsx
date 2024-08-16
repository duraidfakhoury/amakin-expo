import { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");
    const [activities, setActivities] = useState([]);

    const getProfileData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/me', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const { status, data } = response;
            if (status === 200) {
                setProfileData(data.data); // Correctly access the user data
            } else {
                setError("Failed to fetch profile data");
            }
        } catch (error) {
            setError("Failed to fetch profile data");
            console.error(error);
        }
    };

    const getActivities = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/activity/index', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                params: { take: 10 }  // Pass 'take' as a query parameter
            });
            const { status, data } = response;
            if (status === 200) {
                setActivities(data.data);
                console.log(data.data) // Correctly access the activities data
            } else {
                setError("Failed to fetch activities");
            }
        } catch (error) {
            setError("Failed to fetch activities");
            console.error(error);
        }
    };

    useEffect(() => {
        getProfileData();
        getActivities();
    }, []);

    return (
        <div className="profile">
            <div className="view">
                <div className="info">
                    <div className="topInfo">
                        {/* Render image only if profileData and img exist */}
                        {profileData && profileData.image && (
                            <img src={`http://127.0.0.1:8000${profileData.image}`} alt="Profile" />
                        )}
                        <h1>Your Profile</h1>
                    </div>
                    <div className="details">
                        <div className="item">
                            <span className="itemTitle">Full Name: </span>
                            <span className="itemValue">
                                {profileData ? profileData.name : "Loading..."}
                            </span>
                        </div>
                        <div className="item">
                            <span className="itemTitle">Email: </span>
                            <span className="itemValue">
                                {profileData ? profileData.email : "Loading..."}
                            </span>
                        </div>
                        <div className="item">
                            <span className="itemTitle">Phone Number: </span>
                            <span className="itemValue">
                                {profileData ? profileData.phone : "Loading..."}
                            </span>
                        </div>
                        <div className="item">
                            <span className="itemTitle">Status: </span>
                            <span className="itemValue">
                                {profileData ? (profileData.accepted_by_admin ? "Verified" : "Not Verified") : "Loading..."}
                            </span>
                        </div>
                        {error && <div className="error">{error}</div>}
                    </div>
                </div>
                <hr />
            </div>
            <div className="activities">
                <h2>Latest Activities</h2>
                {activities.length > 0 ? (
                    <ul>
                        {activities.map((activity, index) => (
                            <li key={index}>
                                <div>
                                    <p>{activity.description}</p>
                                    <time>{activity.created_at}</time>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p >No activities to show</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
