import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmpData, selectEmpData } from "../redux/employeeSlice";
const EmpListing = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const dispatch = useDispatch();
  const empdata = useSelector(selectEmpData);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/employee/detail/" + id);
  };

  const LoadEdit = (id) => {
    navigate("/employee/edit/" + id);
  };

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8000/employee/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/employee")
    .then((res) => res.json())
    .then((resp) => {
      dispatch(setEmpData(resp));
    })
    .catch((err) => {
      console.log(err.message);
    });
  }, [dispatch]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = empdata && empdata.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>User Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="employee/create" className="btn btn-success">
              Add New (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Role</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {currentUsers &&
                currentUsers.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <a onClick={() => LoadEdit(item.id)} className="btn btn-success">
                        Edit
                      </a>
                      <a onClick={() => Removefunction(item.id)} className="btn btn-danger">
                        Remove
                      </a>
                      <a onClick={() => LoadDetail(item.id)} className="btn btn-primary">
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="pagination">
            {empdata &&
              empdata.length > usersPerPage && (
                <ul className="pagination">
                  {[...Array(Math.ceil(empdata.length / usersPerPage)).keys()].map((number) => (
                    <li key={number + 1} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
                      <a onClick={() => paginate(number + 1)} className="page-link">
                        {number + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
