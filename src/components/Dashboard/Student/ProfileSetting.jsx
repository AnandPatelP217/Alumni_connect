import React, { useState, useEffect } from "react";
import DashboardLayout from "../DashboardLayout";
import { Select, DatePicker, Input, message, Button, Upload, Space } from "antd";
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { API_URL } from "../../../store/apiurl.js";
import "../../../stylesheets/Dashboard/ProfileSetting.css";

const { Option } = Select;
const authorizationToken = localStorage.getItem("token");
let userDataString = localStorage.getItem("userData");
// Step 2: Parse the JSON string to a JavaScript object
let userData = null;

// Step 3: Access the _id field
let studentId = "";

if (userDataString) {
  try {
    userData = JSON.parse(userDataString);
    studentId = userData._id || "";
  } catch (error) {
    console.error("Error parsing user data:", error);
  }
}

if (!studentId) {
  console.error("User ID is missing or invalid.");
}

const GET_URL = `${API_URL}/api/v1/student/getStudentById/${studentId}`;
const UPDATE_URL = `${API_URL}/api/v1/student/updateStudentById/${studentId}`;

const StudentProfileSetting = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    gender: "Select Gender",
    roll: "",
    departmentId: "",
    batch_start: null,
    batch_end: null,
    email: "",
    dateOfBirth: "",
    address: "",
    guardianContact: "",
    enrollmentStatus: "Select Status",
    coursesEnrolled: "",
    skills: "",
    certificates: [{ certificateName: "", issuedBy: "", issueDate: null }],
    profilePicture: null,
    about: "",
    role: "student",
  });

  useEffect(() => {
    getStudentData();
  }, []);

  const getStudentData = async () => {
    try {
      const response = await fetch(GET_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudentData({
          ...data,
          gender: data.gender,
          batch_start: data.batch_start,
          batch_end: data.batch_end,
          dateOfBirth: data.dateOfBirth,
          enrollmentStatus: data.enrollmentStatus,
          coursesEnrolled: data.coursesEnrolled.join(","),
          skills: data.skills.join(","),
          certificates: data.certificates.length > 0 ? data.certificates : [{ certificateName: "", issuedBy: "", issueDate: null }],
        });
      } else {
        console.error("Failed to fetch student data:", response);
        message.error("Failed to load student data.");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      message.error("An error occurred while fetching the data.");
    }
  };

  const handleChange = (value, name) => {
    setStudentData({ ...studentData, [name]: value });
  };

  const onStartDateChange = (date, dateString) => {
    setStudentData({ ...studentData, batch_start: dateString });
  };

  const onEndDateChange = (date, dateString) => {
    setStudentData({ ...studentData, batch_end: dateString });
  };

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      setStudentData({ ...studentData, profilePicture: info.file.response.url });
    }
  };

  const handleCertificateChange = (index, key, value) => {
    const newCertificates = [...studentData.certificates];
    newCertificates[index][key] = value;
    setStudentData({ ...studentData, certificates: newCertificates });
  };

  const addCertificateField = () =>
    setStudentData({
      ...studentData,
      certificates: [...studentData.certificates, { certificateName: "", issuedBy: "", issueDate: null }],
    });

  const removeCertificateField = (index) => {
    const newCertificates = studentData.certificates.filter((_, i) => i !== index);
    setStudentData({ ...studentData, certificates: newCertificates });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formattedData = {
        ...studentData,
        coursesEnrolled: studentData.coursesEnrolled.split(","),
        skills: studentData.skills.split(","),
        certificates: studentData.certificates.filter(
          (cert) => cert.certificateName.trim() !== "" && cert.issuedBy.trim() !== ""
        ),
      };

      const response = await fetch(UPDATE_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorizationToken}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        message.success("Student data updated successfully!");
      } else {
        console.error("Failed to update student data:", response);
        message.error("Failed to update student data.");
      }
    } catch (error) {
      console.error("Error updating student data:", error);
      message.error("An error occurred while updating the data.");
    }
  };

  return (
    <DashboardLayout>
      <div className="profile-setting" style={{ marginBottom: "10rem" }}>
        <div className="w-100 mb-3 rounded mb-5 p-4">
          <h5 className="text-title mb-5 mt-3">Profile Setting</h5>
          <form className="row form-row" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={studentData.name}
                  onChange={(e) => handleChange(e.target.value, "name")}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>Gender</label>
                <Select
                  className="dropdown"
                  onChange={(value) => handleChange(value, "gender")}
                  placeholder="Select Gender"
                  value={studentData.gender}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>Roll Number</label>
                <input
                  className="text-input-field"
                  placeholder="Roll Number"
                  type="text"
                  name="roll"
                  value={studentData.roll}
                  onChange={(e) => handleChange(e.target.value, "roll")}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>
                  Department ID <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Department ID"
                  type="text"
                  name="departmentId"
                  value={studentData.departmentId}
                  onChange={(e) => handleChange(e.target.value, "departmentId")}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>Batch Start Year</label>
                <DatePicker
                  onChange={onStartDateChange}
                  className="dob-input-field"
                  placeholder="Batch Start Year"
                  format="YYYY"
                  name="batch_start"
                  style={{ width: "100%", padding: "12px" }}
                  picker="year"
                  value={studentData.batch_start ? moment(studentData.batch_start, "YYYY") : null}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>Batch End Year</label>
                <DatePicker
                  onChange={onEndDateChange}
                  className="dob-input-field"
                  placeholder="Batch End Year"
                  format="YYYY"
                  name="batch_end"
                  style={{ width: "100%", padding: "12px" }}
                  picker="year"
                  value={studentData.batch_end ? moment(studentData.batch_end, "YYYY") : null}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={studentData.email}
                  onChange={(e) => handleChange(e.target.value, "email")}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>Date of Birth</label>
                <DatePicker
                  className="dob-input-field"
                  placeholder="Date of Birth"
                  format="YYYY-MM-DD"
                  name="dateOfBirth"
                  style={{ width: "100%", padding: "12px" }}
                  onChange={(date, dateString) => handleChange(dateString, "dateOfBirth")}
                  value={studentData.dateOfBirth ? moment(studentData.dateOfBirth, "YYYY-MM-DD") : null}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>Address</label>
                <input
                  className="text-input-field"
                  placeholder="Address"
                  type="text"
                  name="address"
                  value={studentData.address}
                  onChange={(e) => handleChange(e.target.value, "address")}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>Guardian Contact</label>
                <input
                  className="text-input-field"
                  placeholder="Guardian Contact"
                  type="text"
                  name="guardianContact"
                  value={studentData.guardianContact}
                  onChange={(e) => handleChange(e.target.value, "guardianContact")}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>Enrollment Status</label>
                <Select
                  className="dropdown"
                  onChange={(value) => handleChange(value, "enrollmentStatus")}
                  placeholder="Select Status"
                  value={studentData.enrollmentStatus}
                >
                  <Option value="Enrolled">Enrolled</Option>
                  <Option value="Not Enrolled">Not Enrolled</Option>
                  <Option value="Alumnus">Alumnus</Option>
                </Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>Courses Enrolled</label>
                <input
                  className="text-input-field"
                  placeholder="Courses Enrolled"
                  type="text"
                  name="coursesEnrolled"
                  value={studentData.coursesEnrolled}
                  onChange={(e) => handleChange(e.target.value, "coursesEnrolled")}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>Skills</label>
                <input
                  className="text-input-field"
                  placeholder="Skills"
                  type="text"
                  name="skills"
                  value={studentData.skills}
                  onChange={(e) => handleChange(e.target.value, "skills")}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>Certificates</label>
                {studentData.certificates.map((certificate, index) => (
                  <Space key={index} direction="vertical" className="w-100">
                    <Space className="w-100">
                      <Input
                        placeholder="Certificate Name"
                        className="text-input-field"
                        value={certificate.certificateName}
                        onChange={(e) => handleCertificateChange(index, "certificateName", e.target.value)}
                      />
                      <Input
                        placeholder="Issued By"
                        className="text-input-field"
                        value={certificate.issuedBy}
                        onChange={(e) => handleCertificateChange(index, "issuedBy", e.target.value)}
                      />
                      <DatePicker
                        placeholder="Issue Date"
                        className="dob-input-field"
                        value={certificate.issueDate ? moment(certificate.issueDate, "YYYY-MM-DD") : null}
                        format="YYYY-MM-DD"
                        onChange={(date, dateString) => handleCertificateChange(index, "issueDate", dateString)}
                      />
                      <MinusCircleOutlined onClick={() => removeCertificateField(index)} />
                    </Space>
                  </Space>
                ))}
                <Button type="dashed" onClick={addCertificateField} className="mt-3 w-100">
                  <PlusOutlined /> Add Certificate
                </Button>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>Profile Picture</label>
                <Upload
                  className="w-100"
                  name="file"
                  action={`${API_URL}/api/v1/student/uploadProfilePicture`}
                  headers={{ Authorization: `Bearer ${authorizationToken}` }}
                  onChange={handleFileChange}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group mb-2 card-label" style={customStyles.formGroup}>
                <label className="label-style" style={customStyles.labelStyle}>About</label>
                <textarea
                  className="text-input-field w-100"
                  placeholder="Tell us about yourself"
                  name="about"
                  value={studentData.about}
                  onChange={(e) => handleChange(e.target.value, "about")}
                />
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <Button type="primary" htmlType="submit" className="w-100">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
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

export default StudentProfileSetting;
