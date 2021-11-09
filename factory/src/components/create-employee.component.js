import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

import { FACTORY_DEPARTMENTS, SALARY_TYPES } from "../common";

const DEFAULT_DATA = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  work_hours: "",
  salary_type: 1,
  salary: "",
  department: 1,
};

export default class CreateEmployee extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    let { id = "" } = this.props.match.params;

    // Setting up state
    this.state = {
      data: {
        id,
        ...DEFAULT_DATA,
      },
      response: {},
      validated: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    let { id } = this.state.data;

    if (id) {
      this.setState(() => ({ isLoading: true }));

      axios
        .get("http://localhost:8000/api/get-employee/" + id)
        .then(({ data }) => {
          this.setState({ data });
        })
        .finally(() => {
          this.setState(() => ({ isLoading: false }));
        });
    }
  }

  onInputChange = (event) => {
    event.persist();
    let { name, value } = event.target;

    this.setState((prevState) => ({
      data: { ...prevState.data, [name]: value },
    }));
  };

  onSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();

      this.setState(() => ({ validated: true }));
      return;
    }

    this.setState(() => ({ isLoading: true }));

    let { data } = this.state;

    let work_hours = parseFloat(parseFloat(data.work_hours).toFixed(2)),
      salary_type = parseInt(data.salary_type),
      salary = parseFloat(parseFloat(data.salary).toFixed(2)),
      department = parseInt(data.department);

    const empObject = {
      ...data,
      work_hours,
      salary_type,
      salary,
      department,
    };

    if (!data.id) delete empObject["id"];

    // console.log("empObject: ", empObject);
    // return;

    // Update employee
    if (data.id) {
      axios
        .put("http://localhost:8000/api/edit-employee/" + data.id, empObject)
        .then((res) => console.log(res))
        .finally(() => {
          this.setState(() => ({ isLoading: false }));
          this.props.history.push("/employees");
        });
    } else {
      // Add employee
      axios
        .post("http://localhost:8000/api/create-employee", empObject)
        .then(({ data }) => {
          this.setState({
            data: {
              id: "",
              ...DEFAULT_DATA,
            },
            response: data,
            validated: false,
          });
        })
        .catch(({ response }) => {
          // console.log(response);
          this.setState(() => ({ response: response.data }));
        })
        .finally(() => this.setState(() => ({ isLoading: false })));

      setTimeout(() => {
        this.setState(() => ({ response: {} }));
      }, 5000);
    }
  }

  render() {
    let { data, validated, isLoading, response } = this.state;

    return (
      <div className="form-wrapper">
        {response.status && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}

        <Form noValidate validated={validated} onSubmit={this.onSubmit}>
          {/* Name */}
          <Row>
            <Col>
              <Form.Group controlId="FirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="first_name"
                  type="text"
                  value={data.first_name}
                  maxLength="70"
                  onChange={this.onInputChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="LastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="last_name"
                  type="text"
                  value={data.last_name}
                  maxLength="70"
                  onChange={this.onInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={data.email}
              maxLength="50"
              onChange={this.onInputChange}
            />
          </Form.Group>

          <Form.Group controlId="Phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              type="tel"
              value={data.phone}
              maxLength="15"
              onChange={this.onInputChange}
            />
          </Form.Group>

          <Form.Group controlId="WorkHours">
            <Form.Label>Work Hours</Form.Label>
            <Form.Control
              name="work_hours"
              type="number"
              value={data.work_hours}
              min="0"
              step="any"
              onChange={this.onInputChange}
              required
            />
          </Form.Group>

          {/* Salary */}
          <Row>
            <Col>
              <Form.Group controlId="SalaryType">
                <Form.Label>Salary Type</Form.Label>
                <Form.Select
                  name="salary_type"
                  value={data.salary_type}
                  onChange={this.onInputChange}
                >
                  {SALARY_TYPES.map((item) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="Salary">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  name="salary"
                  type="number"
                  value={data.salary}
                  min="0"
                  step="any"
                  onChange={this.onInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="Department">
            <Form.Label>Department</Form.Label>
            <Form.Select
              name="department"
              value={data.department}
              onChange={this.onInputChange}
            >
              {FACTORY_DEPARTMENTS.map((item) => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Button
            className="mt-2"
            variant="dark"
            size="lg"
            block="block"
            type="submit"
            disabled={isLoading}
          >
            {data.id ? "Update" : "Add"} Employee &nbsp;
            {isLoading && <Spinner animation="border" size="sm" />}
          </Button>
        </Form>
      </div>
    );
  }
}
