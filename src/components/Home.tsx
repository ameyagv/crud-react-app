import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [isAdding, setIsAdding] = useState(false); // State for toggling form visibility
  const [newRecord, setNewRecord] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    company: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    company: "",
    address: "",
  });
  const navigate = useNavigate();
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirm) {
      axios
        .delete("http://localhost:3000/users/" + id)
        .then((res) => {
          location.reload();
        })
        .catch((err) => console.log(err));
    }
  };
  const handleAddRecord = () => {
    setIsAdding((prevIsAdding) => !prevIsAdding); // Show or hide the form
  };
  const handleCancel = () => {
    setIsAdding(false); // Hide the form
    setNewRecord({
      name: "",
      email: "",
      phone: "",
      gender: "",
      age: "",
      company: "",
      address: "",
    });
  };

  const handleSave = () => {
    // Save the new record, update the data array, and hide the form
    axios
      .post("http://localhost:3000/users", newRecord)
      .then((res) => {
        setNewRecord({
          name: "",
          email: "",
          phone: "",
          gender: "",
          age: "",
          company: "",
          address: "",
        });
        setIsAdding(false);
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id: number) => {
    const recordToEdit = data.find((d) => d.id === id);
    setEditedRecord({ ...recordToEdit });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // Save the edited record, update the data array, and exit edit mode
    axios
      .put(`http://localhost:3000/users/${editedRecord.id}`, editedRecord)
      .then((res) => {
        setIsEditing(false);
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const cyanText = {
    color: ".text-info",
  };
  const indigo400Color = {
    color: "#6D28D9",
  };
  const [query, setQuery] = useState("");
  const keys = ["name", "email"];
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="d-flex flex-column justify-content-center bg-light">
      <h1>Users Management Console</h1>
      <div className="w-80 rounded bg-white border p-4">
        <div className="d-flex justify-content-start mb-3">
          <button className="btn btn-primary" onClick={handleAddRecord}>
            + ADD RECORD
          </button>
        </div>
        {isAdding && (
          <div className="row">
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={newRecord.name}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, name: e.target.value })
                }
              />
            </div>

            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Gender"
                value={newRecord.gender}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, gender: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Age"
                value={newRecord.age}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, age: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              {/* <label htmlFor="company">Company:</label> */}
              <input
                type="text"
                name="company"
                className="form-control"
                style={{ textTransform: "uppercase" }}
                placeholder="Enter Company Name"
                onChange={(e) =>
                  setNewRecord({ ...newRecord, company: e.target.value })
                }
              />
            </div>

            <div className="col-md-3 mb-3">
              {/* <label htmlFor="email">Email:</label> */}
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                onChange={(e) =>
                  setNewRecord({ ...newRecord, email: e.target.value })
                }
              />
            </div>
            <div className="col-md-3 mb-3">
              {/* <label htmlFor="phone">Phone Number:</label> */}
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Enter Phone Number"
                pattern="^\+1 \(\d{3}\) \d{3}-\d{4}$"
                onChange={(e) =>
                  setNewRecord({ ...newRecord, phone: e.target.value })
                }
              />
              {/* <small className="form-text text-muted">
                Format: +1 (920) 505-2254
              </small> */}
            </div>
            <div className="col-md-3 mb-3">
              {/* <label htmlFor="address">Address:</label> */}
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Enter Address "
                onChange={(e) =>
                  setNewRecord({ ...newRecord, address: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
              &nbsp; &nbsp;
              <button className="btn btn-danger" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="table-responsive">
          <div className="app">
            <input
              className="search"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
          </div>
          <table className="table table-sm">
            <thead>
              <tr>
                <th style={indigo400Color}>Actions</th>
                <th style={indigo400Color}>ID</th>
                <th style={indigo400Color}>Name</th>
                <th style={indigo400Color}>Gender</th>
                <th style={indigo400Color}>Age</th>
                <th style={indigo400Color}>Company</th>
                <th style={indigo400Color}>Email</th>
                <th style={indigo400Color}>Phone</th>
                <th style={indigo400Color}>Address</th>
              </tr>
            </thead>
            <tbody>
              {search(data).map((d, i) => (
                <tr key={i}>
                  <td>
                    <div className="d-flex">
                      {isEditing && d.id === editedRecord.id ? (
                        <>
                          <button
                            className="btn btn-primary me-3"
                            onClick={handleSaveEdit}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={(e) => handleEdit(d.id)}
                            className=" btn-primary me-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pen"
                              viewBox="0 0 16 16"
                            >
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => handleDelete(d.id)}
                            className=""
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                  <td style={cyanText}>{d.id}</td>
                  <td className="text-info">
                    {isEditing && d.id === editedRecord.id ? (
                      <input
                        type="text"
                        value={editedRecord.name}
                        onChange={(e) =>
                          setEditedRecord({
                            ...editedRecord,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      d.name
                    )}
                  </td>
                  <td className="text-info">{d.gender}</td>
                  <td className="text-info">
                    {isEditing && d.id === editedRecord.id ? (
                      <input
                        type="text"
                        value={editedRecord.age}
                        onChange={(e) =>
                          setEditedRecord({
                            ...editedRecord,
                            age: e.target.value,
                          })
                        }
                      />
                    ) : (
                      d.age
                    )}
                  </td>
                  <td className="text-info">
                    {isEditing && d.id === editedRecord.id ? (
                      <input
                        type="text"
                        value={editedRecord.company}
                        onChange={(e) =>
                          setEditedRecord({
                            ...editedRecord,
                            company: e.target.value,
                          })
                        }
                      />
                    ) : (
                      d.company
                    )}
                  </td>
                  <td className="text-info">
                    {isEditing && d.id === editedRecord.id ? (
                      <input
                        type="text"
                        value={editedRecord.email}
                        onChange={(e) =>
                          setEditedRecord({
                            ...editedRecord,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      d.email
                    )}
                  </td>
                  <td className="text-info">
                    {isEditing && d.id === editedRecord.id ? (
                      <input
                        type="text"
                        value={editedRecord.phone}
                        onChange={(e) =>
                          setEditedRecord({
                            ...editedRecord,
                            phone: e.target.value,
                          })
                        }
                      />
                    ) : (
                      d.phone
                    )}
                  </td>
                  <td className="text-info">
                    {isEditing && d.id === editedRecord.id ? (
                      <input
                        type="text"
                        value={editedRecord.address}
                        onChange={(e) =>
                          setEditedRecord({
                            ...editedRecord,
                            address: e.target.value,
                          })
                        }
                      />
                    ) : (
                      d.address
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
