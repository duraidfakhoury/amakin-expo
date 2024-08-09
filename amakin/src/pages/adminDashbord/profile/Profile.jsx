import { useEffect, useState } from "react";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";
import "./profile.css";

const Profile = (props) => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");

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

    useEffect(() => {
        getProfileData();
    }, []);

    return (
        <div className="profile">
            <div className="view">
                <div className="info">
                    <div className="topInfo">
                        {/* Render image only if profileData and img exist */}
                        {profileData && profileData.img && <img src={profileData.img} alt="Profile" />}
                        <h1>Your Profile</h1>
                        <button>Update</button>
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
                {props.chart && (
                    <div className="chart">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={props.chart.data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {props.chart.dataKeys.map(dataKey => (
                                    <Line
                                        key={dataKey.name}
                                        type="monotone"
                                        dataKey={dataKey.name}
                                        stroke={dataKey.color}
                                        activeDot={{ r: 8 }}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
            <div className="activities">
                <h2>Latest Activities</h2>
                {props.activities && (
                    <ul>
                        {props.activities.map((activity, index) => (
                            <li key={index}>
                                <div>
                                    <p>{activity.text}</p>
                                    <time>{activity.time}</time>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Profile;
