import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import EmployeeTableRow from "./EmployeeTableRow";

import { FACTORY_DEPARTMENTS } from "../common";

export default class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      isLoading: true,
    };
  }

  listEmployees = () => {
    axios
      .get("http://localhost:8000/api/employees/")
      .then(({ data }) => {
        let employees = data.map((item, i) => {
          let name = item.first_name + " " + item.last_name,
            dept_name = FACTORY_DEPARTMENTS.find(
              (v) => v.value === item.department
            ).name;
          return { ...item, name, dept_name };
        });

        this.setState({ employees });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState(() => ({ isLoading: false }));
      });
  };

  componentDidMount() {
    this.listEmployees();
  }

  DataTable() {
    return this.state.employees.map((res, i) => {
      return (
        <EmployeeTableRow obj={res} key={res.id} onDelete={this.listEmployees} />
      );
    });
  }

  render() {
    let { isLoading, employees } = this.state;

    return isLoading ? (
      <h2 className="text-center">
        Loading...{" "}
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </h2>
    ) : (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length ? (
              this.DataTable()
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Records!
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
