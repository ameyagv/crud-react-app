import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";

function Create() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    company: "",
    address: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/users", values)
      .then((res) => {
        console.log(res);
        navigate("/")
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add a User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label>Gender:</label>
            <div className="form-check">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                className="form-check-input"
                onChange={(e) =>
                  setValues({ ...values, gender: e.target.value })
                }
              />
              <label htmlFor="male" className="form-check-label">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                className="form-check-input"
                onChange={(e) =>
                  setValues({ ...values, gender: e.target.value })
                }
              />
              <label htmlFor="female" className="form-check-label">
                Female
              </label>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              name="age"
              className="form-control"
              placeholder="Enter Age"
              onChange={(e) => setValues({ ...values, age: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              name="company"
              className="form-control"
              style={{ textTransform: "uppercase" }}
              placeholder="Enter Company Name"
              onChange={(e) =>
                setValues({ ...values, company: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Enter Phone Number"
              pattern="^\+1 \(\d{3}\) \d{3}-\d{4}$"
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
            <small className="form-text text-muted">
              Format: +1 (920) 505-2254
            </small>
          </div>
          <div className="mb-2">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Enter Address (e.g., 118 Cambridge Place, Riegelwood, Mississippi, 9238)"
              onChange={(e) =>
                setValues({ ...values, address: e.target.value })
              }
            />
          </div>
          <button className="btn btn-success">Submit</button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Create;
