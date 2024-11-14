import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { registerUser } from "../../store/userSlice";
import "./Register.css";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [region, setRegion] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const userStatus = useSelector((state: RootState) => state.user.status);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
  

    const userData = {
      username: username,
      password: password,
      organization: organization,
      ...(organization === "IDF" && { region: region })
    };
  
    dispatch(registerUser(userData));
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Organization:
        <select
          name="organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        >
          <option value="">Select Organization</option>
          <option value="IDF">IDF</option>
          <option value="Hezbollah">Hezbollah</option>
          <option value="Hamas">Hamas</option>
          <option value="Houthis">Houthis</option>
          <option value="IRGC">IRGC</option>
        </select>
      </label>

      {organization === "IDF" && (
        <label>
          Region:
          <select
            name="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">Select Region</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Center">Center</option>
            <option value="West Bank">West Bank</option>
          </select>
        </label>
      )}

      <button type="submit">Register</button>
      {userStatus === "loading" && <p>Registering...</p>}
      {userStatus === "failed" && <p>Registration failed</p>}
      {userStatus === "succeeded" && <p>Registration successful!</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
};

export default Register;
