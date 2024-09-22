import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { API_URL } from "../../../store/apiurl.js";
import "../../../stylesheets/Dashboard/Dashboard.css";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalAlumnis, setTotalAlumnis] = useState(0);
  const [totalVecancies, setTotalVecancies] = useState(0);

  const fetchVecaciesCount = async () => {
    const authorizationToken = localStorage.getItem("token");
    const URL = `${API_URL}/api/v1/vacancy/getAllVacancies`;

    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTotalVecancies(data.length); // Assuming data is an array of students
      } else {
        console.error("Failed to fetch students:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchVecaciesCount();
  }, []);


  const fetchAlumniCount = async () => {
    const authorizationToken = localStorage.getItem("token");
    const URL = `${API_URL}/api/v1/admin/getAllAlumni`;

    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTotalAlumnis(data.length); // Assuming data is an array of students
      } else {
        console.error("Failed to fetch students:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchAlumniCount();
  }, []);


  const fetchStudentCount = async () => {
    const authorizationToken = localStorage.getItem("token");
    const URL = `${API_URL}/api/v1/admin/getAllStudent`;

    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTotalStudents(data.length); // Assuming data is an array of students
      } else {
        console.error("Failed to fetch students:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudentCount();
  }, []);

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3
              style={{
                color: "var(--headingColor)",
                fontWeight: "500",
                fontSize: "1.5rem",
              }}
            >
              Welcome Admin!
            </h3>
            <ul className="breadcrumb">
              <li
                style={{
                  color: "var(--textLight)",
                  fontSize: "1rem",
                }}
              >
                Welcome back to your dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
          <div className="info-card">
            <span className="info-icon first-icon">
              <i className="fa-solid fa-graduation-cap"></i>
            </span>

            <h3 className="info-count">{totalStudents}</h3> {/* Display total students here */}

            <p className="info-label">Total Students</p>
          </div>
        </div>

        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
          <div className="info-card">
            <span className="info-icon third-icon">
              <i className="fa-solid fa-user-tie"></i>
            </span>

            <h3 className="info-count">{totalAlumnis}</h3>

            <NavLink to={"/admin/ViewAlumnis"} activeClassName="active" end>
               <span>All Alumnis</span>
              </NavLink>
          </div>
        </div>

        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
          <div className="info-card">
            <span className="info-icon second-icon">
              <i className="fa-solid fa-display"></i>
            </span>
            
            <h3 className="info-count">{totalVecancies}</h3>

            <NavLink to={"/admin/vacancies"} activeClassName="active" end>
   <span>Toatal  Vacacies</span>
              </NavLink>
          </div>
        </div>
                
      </div>

     
    </DashboardLayout>
  );
};

export default AdminDashboard;
