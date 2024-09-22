import React, { useState } from "react";
import { message } from "antd";
import { API_URL } from "../../../store/apiurl.js";

const ChangePassword = ({ alumniId }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      message.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/v1/alumni/changePassword/${alumniId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        message.success("Password updated successfully");
      } else {
        const data = await response.json();
        message.error(data.msg || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      message.error("An error occurred while updating password");
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handlePasswordChange}>Change Password</button>
    </div>
  );
};

export default ChangePassword;
