import React, { Component } from "react";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import { currFormat, FACTORY_DEPARTMENTS, SALARY_TYPES } from "../common";

export default class ViewSalary extends Component {
  constructor(props) {
    super(props);
    let { id = "" } = this.props.match.params;

    this.state = {
      id,
      name: "",
      dept_name: "",
      sal_type_name: "",
      calc_salary: 0,
      isLoading: true,
    };
  }

  componentDidMount() {
    let { id } = this.state;

    axios
      .get("http://localhost:8000/api/get-employee/" + id)
      .then(({ data }) => {
        const dept_name = FACTORY_DEPARTMENTS.find(
            (v) => v.value === data.department
          ).name,
          sal_type_name = SALARY_TYPES.find(
            (v) => v.value === data.salary_type
          ).name;

        let calc_salary = data.salary;
        switch (data.salary_type) {
          case 1:
            calc_salary *= data.work_hours;
            break;
          case 3:
            calc_salary *= data.work_hours;
            if (data.work_hours < 100) calc_salary *= data.work_hours * 0.75;
            break;
          default:
            break;
        }

        this.setState({
          ...data,
          name: data.first_name + " " + data.last_name,
          dept_name,
          sal_type_name,
          calc_salary: currFormat(calc_salary),
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState(() => ({ isLoading: false }));
      });
  }

  render() {
    let { name, dept_name, sal_type_name, calc_salary, work_hours, isLoading } =
      this.state;

    return (
      <Container>
        <h5>Salary Details: </h5>

        {isLoading ? (
          <h2 className="text-center">
            Loading...{" "}
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </h2>
        ) : (
          <React.Fragment>
            <Row>
              <Col>
                <b>Name: </b>
                {name}
              </Col>
              <Col>
                <b>Department: </b>
                {dept_name}
              </Col>
            </Row>

            <Row>
              <Col>
                <b>Salary Type: </b>
                {sal_type_name}
              </Col>
              <Col>
                <b>Salary: </b>
                {calc_salary}
              </Col>
            </Row>

            <Row>
              <Col>
                <b>Work Hours: </b>
                {work_hours}
              </Col>
            </Row>
          </React.Fragment>
        )}
      </Container>
    );
  }
}
