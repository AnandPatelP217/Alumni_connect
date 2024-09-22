import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { API_URL } from "../../../store/apiurl.js";

const authorizationToken = localStorage.getItem("token");
const URL = `${API_URL}/api/v1/admin/getAllStudent`;

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState(""); // Sorting state
  const [tableHeight] = useState(500); // Fixed table height for vertical scrolling

  const getAllStudentData = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setStudents(data);
        setFilteredStudents(data); // Initialize filteredStudents with all students
      } else {
        console.error("Failed to fetch students:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredStudents(filtered);
  };

  // Sort students based on selected criteria
  const handleSort = (criteria) => {
    let sortedStudents = [...filteredStudents]; // Create a copy of the current list

    if (criteria === 'department') {
      sortedStudents.sort((a, b) => a.departmentId.localeCompare(b.departmentId));
    } else if (criteria === 'batchStart') {
      sortedStudents.sort((a, b) => a.batch_start - b.batch_start);
    } else if (criteria === 'batchEnd') {
      sortedStudents.sort((a, b) => a.batch_end - b.batch_end);
    }

    setFilteredStudents(sortedStudents); // Update with the sorted list
    setSortCriteria(criteria); // Set the sorting criteria
  };

  useEffect(() => {
    getAllStudentData();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchInputStyle}
          />
          <button onClick={handleSearch} style={buttonStyle}>
            Search
          </button>
          <select
            value={sortCriteria}
            onChange={(e) => handleSort(e.target.value)}
            style={dropdownStyle}
          >
            <option value="">Sort by</option>
            <option value="department">Department</option>
            <option value="batchStart">Batch Start</option>
            <option value="batchEnd">Batch End</option>
          </select>
        </div>
        <div
          style={{
            overflowY: "auto",
            height: `${tableHeight}px`,
            border: "2px solid #007BFF",
            borderRadius: "8px",
          }}
        >
          {filteredStudents.length === 0 ? (
            <div>No Students available</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>S.No</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Roll</th>
                  <th style={thStyle}>Department ID</th>
                  <th style={thStyle}>Batch Start</th>
                  <th style={thStyle}>Batch End</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Date of Birth</th>
                  <th style={thStyle}>Gender</th>
                  <th style={thStyle}>Address</th>
                  <th style={thStyle}>Guardian Contact</th>
                  <th style={thStyle}>Enrollment Status</th>
                  <th style={thStyle}>Courses Enrolled</th>
                  <th style={thStyle}>Profile Picture</th>
                  <th style={thStyle}>About</th>
                  <th style={thStyle}>Certificates</th>
                  <th style={thStyle}>Skills</th>
                  <th style={thStyle}>Id</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student._id}>
                    <td style={tdStyle}>{index + 1}</td>
                    <td style={tdStyle}>{student.name}</td>
                    <td style={tdStyle}>{student.roll}</td>
                    <td style={tdStyle}>{student.departmentId}</td>
                    <td style={tdStyle}>{student.batch_start}</td>
                    <td style={tdStyle}>{student.batch_end}</td>
                    <td style={tdStyle}>{student.email}</td>
                    <td style={tdStyle}>
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </td>
                    <td style={tdStyle}>{student.gender}</td>
                    <td style={tdStyle}>{student.address}</td>
                    <td style={tdStyle}>{student.guardianContact}</td>
                    <td style={tdStyle}>{student.enrollmentStatus}</td>
                    <td style={tdStyle}>
                      {student.coursesEnrolled.join(", ")}
                    </td>
                    <td style={tdStyle}>
                      {student.profilePicture ? (
                        <img
                          src={student.profilePicture}
                          alt={student.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/path/to/default-avatar.png";
                          }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td style={tdStyle}>{student.about}</td>
                    <td style={tdStyle}>
                      {student.certificates
                        .map((cert) => cert.certificateName)
                        .join(", ")}
                    </td>
                    <td style={tdStyle}>{student.skills.join(", ")}</td>
                    <td style={tdStyle}>{student._id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

// Inline styles for table headers, cells, buttons, and search input
const thStyle = {
  padding: "12px 15px",
  borderBottom: "2px solid #007BFF",
  borderRight: "2px solid #007BFF",
  backgroundColor: "#3a4fab",
  color: "#ffffff",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "12px 15px",
  borderBottom: "1px solid #000000",
  borderRight: "1px solid #000000",
  textAlign: "left",
  color: "#000000",
};

const buttonStyle = {
  padding: "8px 12px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginLeft: "10px",
};

const dropdownStyle = {
  padding: "8px 12px",
  marginLeft: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const searchInputStyle = {
  padding: "8px 12px",
  width: "250px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

export default ViewStudents;
