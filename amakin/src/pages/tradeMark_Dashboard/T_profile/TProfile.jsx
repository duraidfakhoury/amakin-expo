import { useEffect, useState } from "react";
import axios from "axios";
import "./Tprofile.css";

const TProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");
    const [activities, setActivities] = useState([]);
    const [balance, setBalance] = useState();

    // Fetch profile data
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
                setProfileData(data.data);
            } else {
                setError("Failed to fetch profile data");
            }
        } catch (error) {
            setError("Failed to fetch profile data");
            console.error(error);
        }
    };

    // Fetch activities
    const getActivities = async () => {
        const number = {
            take: 10
        };
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/activity/index', {
                params: number,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const { status, data } = response;
            if (status === 200) {
                setActivities(data.data);
            } else {
                setError("Failed to fetch activities");
            }
        } catch (error) {
            setError("Failed to fetch activities");
            console.error(error);
        }
    };

    // Fetch wallet balance
    const fetchWalletBalance = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/user/wallet`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = response.data.data;
            setBalance(data.amount);
        } catch (error) {
            console.error('Error fetching wallet balance:', error);
        }
    };

    // useEffect to fetch all data on component mount
    useEffect(() => {
        getProfileData();
        getActivities();
        fetchWalletBalance();
    }, []);  // Empty dependency array to run effect only on mount

    return (
        <div className="Tprofile">
            <div className="view">
                <div className="info">
                    <div className="topInfo">
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
                            <span className="itemTitle">Trademark Name: </span>
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
                        <h2>Current Balance</h2>
                        <span>{balance}$</span>
                    </div>
                    <div className="more">
                        <p>View your transactions</p>
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
                    <p>No activities to show</p>
                )}
            </div>
        </div>
    );
};

export default TProfile;
