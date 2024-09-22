import React, { useState, useEffect } from "react";
import DashboardLayout from "../DashboardLayout";
import { Input, Button, message, App as AntApp } from "antd";
import { API_URL } from "../../../store/apiurl.js";


const authorizationToken = localStorage.getItem('token');
// Step 1: Retrieve the JSON string from local storage
let userDataString = localStorage.getItem('userData');

// Step 2: Parse the JSON string to a JavaScript object
let userData = null;

// Step 3: Access the _id field
let userId = "";

if (userDataString) {
  try {
    userData = JSON.parse(userDataString);
    userId = userData._id || "";
  } catch (error) {
    console.error("Error parsing user data:", error);
  }
}

if (!userId) {
  console.error("User ID is missing or invalid.");
}

const GET_URL = `${API_URL}/api/v1/alumni/getAlumniById/${userId}`;
const ProfileSetting = () => {

  const [alumniData, setAlumniData] = useState({
    name: '',
    phone: '',
    address: '',
    graduationYear: '',
    current_company: '',
    job_info: '',
    about: '',
    roll_no: '',
    linkedin: ''
  });

  // Fetch alumni data
  const getAlumniData = async () => {
    try {
      const response = await fetch(GET_URL, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAlumniData(data);
      } else {
        console.error("Failed to fetch alumni data:", response);
        message.error("Failed to load alumni data.");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while fetching the data.");
    }
  };

  useEffect(() => {
    getAlumniData();
  }, []);

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumniData({
      ...alumniData,
      [name]: value,
    });
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
  
      const response = await fetch(`${API_URL}/api/v1/alumni/updateAlumniById/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(alumniData),
      });

      if (response.ok) {
        const data = await response.json();
        setAlumniData(data);
        message.success("Alumni data updated successfully!");
      } else {
        console.error("Failed to update alumni data:", response);
        message.error("Failed to update alumni data.");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while updating the data. Please try again later.");
    }
  };

  return (
    <AntApp>
      <DashboardLayout>
        <div className="profile-setting" style={{ marginBottom: "10rem" }}>
          <div className="w-100 mb-3 rounded mb-5 p-2">
            <h5 className="text-title mb-5 mt-3">Edit Alumni Profile</h5>
            <form className="row form-row">
              {/* Editable Fields */}
              <div className="col-md-6">
                <div className="form-group mb-2 card-label"  style={customStyles.formGroup}>
                  <label className="label-style" style={customStyles.labelStyle}>Name</label>
                  <Input
                    className="text-input-field"
                    name="name"
                    value={alumniData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label"  style={customStyles.formGroup}>
                  <label className="label-style" style={customStyles.labelStyle}>Phone</label>
                  <Input
                    className="text-input-field"
                    name="phone"
                    value={alumniData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label"  style={customStyles.formGroup}>
                  <label className="label-style" style={customStyles.labelStyle}>Address</label>
                  <Input
                    className="text-input-field"
                    name="address"
                    value={alumniData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label"  style={customStyles.formGroup}>
                  <label className="label-style" style={customStyles.labelStyle}>Graduation Year</label>
                  <Input
                    className="text-input-field"
                    name="graduationYear"
                    value={alumniData.graduationYear}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label"  style={customStyles.formGroup}>
                  <label className="label-style" style={customStyles.labelStyle}>Current Organisation</label>
                  <Input
                    className="text-input-field"
                    name="current_company"
                    value={alumniData.current_company}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label"  style={customStyles.formGroup}>
                  <label className="label-style" style={customStyles.labelStyle}>Designation and Job Info</label>
                  <Input
                    className="text-input-field"
                    name="job_info"
                    value={alumniData.job_info}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label"  style={customStyles.formGroup}>
                  <label  className="label-style" style={customStyles.labelStyle}>About</label>
                  <Input
                    className="text-input-field"
                    name="about"
                    value={alumniData.about}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label"  style={customStyles.formGroup}>
                  <label className="label-style" style={customStyles.labelStyle}>Roll Number</label>
                  <Input
                    className="text-input-field"
                    name="roll_no"
                    value={alumniData.roll_no}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label"  style={customStyles.formGroup}>
                  <label className="label-style" style={customStyles.labelStyle}>LinkedIn</label>
                  <Input
                    className="text-input-field"
                    name="linkedin"
                    value={alumniData.linkedin}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button type="primary" onClick={handleSubmit} className="btn my-3">
                  Submit Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DashboardLayout>
    </AntApp>
  );
};
const customStyles = {
  formGroup: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",

  },
  labelStyle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginBottom:"23px",
    backgroundColor:"#ffffff"
  },
};


export default ProfileSetting;
