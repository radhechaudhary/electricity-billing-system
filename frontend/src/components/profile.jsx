import React from "react";
import "./profile.css"; // Import external CSS file
import TopBar from "./TopBar";
import Navigation from "./navigation";
import { useSelector } from "react-redux";

const ProfileInfo = () => {
  const profile= useSelector(state=>state.profile)
  return (
    <div className=" user-page">
        <TopBar/>
    <div className="page">
        <Navigation/>
    <div className="profile-info-page">
    <div className="profile-container">
      <h2 className="profile-title">Profile Information</h2>
      <div className="profile-field">
        <label>Name</label>
        <input type="text" value={profile.name} readOnly />
      </div>
      <div className="profile-field">
        <label>Mobile Number</label>
        <input type="text" value={profile.mobile} readOnly />
      </div>
      <div className="profile-field">
        <label>Email ID</label>
        <input type="email" value={profile.mail} readOnly />
      </div>
      <div className="profile-field">
        <label>Aadhar Number</label>
        <input type="text" value={profile.aadhar} readOnly />
      </div>
      <div className="profile-field">
        <label>Connection Number</label>
        <input type="text" value={profile.username} readOnly />
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default ProfileInfo;
