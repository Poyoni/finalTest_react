import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchResources, voteCandidate } from "../../store/attackSlice";
import { RootState } from "../../store/store";
import "./defensePage.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

type Resource = {
  _id: string;
  name: string;
  amount: number;
};

const DefensePage: React.FC = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state: RootState) => state.attack);


  const token = localStorage.getItem("token");
  const decoded = jwtDecode<{ id: string; organization: string; region?: string ; resources: Resource[]}>(token!)

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchResources());
    }
  }, [status, dispatch]);

  return (
    <div className="defense-page">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="header">
        <h1 className="organization-info">
          {decoded.organization} - {decoded.region}
        </h1>
      </div>
      <form className="resource-form">
        {decoded && (
          <div className="resources-container">
            <h2 className="resources-title">Resources:</h2>
            <div className="resources-list">
            {Array.isArray(decoded.resources) && decoded.resources.map((resource: any) => (
              <div key={resource._id} className="resource-card">
                  <button className="resource-button">
                    <h3>{resource.name}</h3>
                  </button>
                <p className="resource-amount">{resource.amount}</p>
              </div>
            ))}
            </div>
          </div>
        )}
      </form>
      <table className="DefensePageTable">
        <thead>
          <tr>
            <th>Rocket</th>
            <th>Time To Hit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DefensePage;


