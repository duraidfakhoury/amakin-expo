import { useEffect, useState } from "react";
import axios from "axios";
import "./Tprofile.css";



const TProfile = (props) => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");
    const [activities , setActivities ] = useState([]);

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
        const number = {
            take : 10
        }
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/activity/index',number , {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const { status, data } = response;
            if (status === 200) {
                setActivities(data.data); // Correctly access the user data
                console.log (activities);
            } else {
                setError("Failed to activities");
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
        <div className="Tprofile">
            <div className="view">
                <div className="info">
                    <div className="topInfo">
                        {/* Render image only if profileData and img exist */}
                        {profileData && profileData.image && <img src={`http://127.0.0.1:8000${profileData.image}`} alt="Profile" />}
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
                            <span className="itemTitle">TradeMrk Name: </span>
                            <span className="itemValue">
                                {profileData ? profileData.trademark_name : "Loading..."}
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
                <div className="wallet">
                    <div className="wallet-info">
                        <h2>Current balance</h2>
                        <span>200.00$</span>
                    </div>
                    <div className="more">
                        <p>view your transactions</p>
                        <button>View</button>
                    </div>
                </div>
            </div>
            <div className="activities">
                <h2>Latest Activities</h2>
                {activities.length > 0 ? (
                    <ul>
                        {activities.map((activity, index) => (
                            <li key={index}>
                                <div>
                                    <p>{activity.text}</p>
                                    <time>{activity.time}</time>
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

export default TProfile;
