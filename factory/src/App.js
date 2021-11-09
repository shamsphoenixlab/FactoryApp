import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateEmployee from "./components/create-employee.component";
import EmployeeList from "./components/list-employees.component";
import ViewSalary from "./components/view-salary.component";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="light" variant="light">
            <Container>
              <Navbar.Brand>
                <Link to={"/employees"} className="nav-link">
                  Demo Factory
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-employee"} className="nav-link">
                    Add Employee
                  </Link>
                  <Link to={"/employees"} className="nav-link">
                    Employee List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={EmployeeList} />
                  <Route path="/employees" component={EmployeeList} />
                  <Route
                    key="add-employee"
                    path="/create-employee"
                    component={CreateEmployee}
                  />
                  <Route
                    key="edit-employee"
                    path="/edit-employee/:id"
                    component={CreateEmployee}
                  />
                  <Route path="/view-salary/:id" component={ViewSalary} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
