import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const EmployeeTableRow = ({ obj, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteEmployee = useCallback(() => {
    let ans = window.confirm("Are you sure!");
    if (!ans) return;

    setIsLoading(true);

    axios
      .delete("http://localhost:8000/api/employee/" + obj.id)
      .then((res) => {
        onDelete();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, [obj, onDelete]);

  return (
    <tr>
      <td>{obj.name}</td>
      <td>{obj.email}</td>
      <td>{obj.phone}</td>
      <td>{obj.dept_name}</td>
      <td>
        <Row>
          <Col>
            <Link
              to={"/view-salary/" + obj.id}
              onClick={(event) => isLoading && event.preventDefault()}
            >
              <Button variant="outline-primary" size="sm" disabled={isLoading}>
                View Salary
              </Button>
            </Link>
          </Col>

          <Col>
            <Link
              to={"/edit-employee/" + obj.id}
              onClick={(event) => isLoading && event.preventDefault()}
            >
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={isLoading}
              >
                Edit
              </Button>
            </Link>
          </Col>

          <Col>
            <Button
              onClick={deleteEmployee}
              variant="outline-danger"
              size="sm"
              disabled={isLoading}
            >
              Delete{" "}
              {isLoading && (
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </Button>
          </Col>
        </Row>
      </td>
    </tr>
  );
};

export default EmployeeTableRow;
