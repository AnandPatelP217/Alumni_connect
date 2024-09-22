import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout.jsx";
import { API_URL } from "../../../store/apiurl.js";

const authorizationToken = localStorage.getItem('token');
const URL = `${API_URL}/api/v1/admin/getAllAlumni`;

const ViewAlumnis = () => {
  const [alumnis, setAlumnis] = useState([]);
  const [filteredAlumnis, setFilteredAlumnis] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState(""); // Sorting state
  const [tableHeight] = useState(500); // Fixed table height for vertical scrolling

  const getAllAlumniData = async () => {
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
        setAlumnis(data);
        setFilteredAlumnis(data); // Initialize filteredAlumnis with all alumnis
      } else {
        console.error("Failed to fetch Alumnis:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching Alumnis:", error);
    }
  };

  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = alumnis.filter((alumni) =>
      alumni.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredAlumnis(filtered);
  };

  // Sort the alumni list by branch or batch
  const handleSort = (criteria) => {
    let sortedAlumnis = [...filteredAlumnis]; // Copy current list of alumni
    if (criteria === 'branch') {
      // Sort by departmentId (branch)
      sortedAlumnis.sort((a, b) => a.departmentId.localeCompare(b.departmentId));
    } else if (criteria === 'batch') {
      // Sort by graduation year (batch)
      sortedAlumnis.sort((a, b) => a.graduationYear - b.graduationYear);
    }

    setFilteredAlumnis(sortedAlumnis); // Update with sorted list
    setSortCriteria(criteria); // Set the sort criteria
  };

  useEffect(() => {
    getAllAlumniData();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <div style={{ marginBottom: '20px' }}>
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
            <option value="branch">Branch (Department)</option>
            <option value="batch">Batch (Graduation Year)</option>
          </select>
        </div>
        {filteredAlumnis.length === 0 ? (
          <div>No Alumnis available</div>
        ) : (
          <div style={{ overflowY: 'auto', height: `${tableHeight}px`, border: '2px solid #007BFF', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>S.No</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Roll No</th>
                  <th style={thStyle}>Department ID</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Graduation Year</th>
                  <th style={thStyle}>Gender</th>
                  <th style={thStyle}>Address</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Current Organisation</th>
                  <th style={thStyle}>Expertise</th>
                  <th style={thStyle}>Designation and Job Info</th>
                  <th style={thStyle}>About</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>LinkedIn</th>
                  <th style={thStyle}>UserId</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlumnis.map((alumni, index) => (
                  <tr key={alumni._id}>
                    <td style={tdStyle}>{index + 1}</td> {/* Serial number */}
                    <td style={tdStyle}>{alumni.name}</td>
                    <td style={tdStyle}>{alumni.roll_no}</td>
                    <td style={tdStyle}>{alumni.departmentId}</td>
                    <td style={tdStyle}>{alumni.email}</td>
                    <td style={tdStyle}>{alumni.graduationYear}</td>
                    <td style={tdStyle}>{alumni.gender}</td>
                    <td style={tdStyle}>{alumni.address}</td>
                    <td style={tdStyle}>{alumni.phone}</td>
                    <td style={tdStyle}>{alumni.current_company}</td>
                    <td style={tdStyle}>{alumni.expertise.join(", ")}</td>
                    <td style={tdStyle}>{alumni.job_info}</td>
                    <td style={tdStyle}>{alumni.about}</td>
                    <td style={tdStyle}>{alumni.role}</td>
                    <td style={tdStyle}>
                      <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </td>
                    <td style={tdStyle}>{alumni._id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

// Inline styles for table headers, cells, buttons, dropdown, and search input
const thStyle = {
  padding: '12px 15px',
  borderBottom: '2px solid #007BFF',
  borderRight: '2px solid #007BFF',
  backgroundColor: '#3a4fab',
  color: '#ffffff',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '12px 15px',
  borderBottom: '1px solid #000000',
  borderRight: '1px solid #000000',
  textAlign: 'left',
  color: '#000000',
};

const buttonStyle = {
  padding: '8px 12px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginLeft: '10px',
};

const dropdownStyle = {
  padding: '8px 12px',
  marginLeft: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const searchInputStyle = {
  padding: '8px 12px',
  width: '250px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

export default ViewAlumnis;
