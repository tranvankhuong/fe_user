import React from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Button,
  Form,
  FormControl,
  FormSelect,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { getAllSubject, getAllCat } from "../services/header.service";

import Dropdown from "react-multilevel-dropdown";
import { useContext, useEffect, useState } from "react";

import "../App.css";
import FrameCart from "./Cart/FrameCart";
import FrameWatch from "./WatchList/FrameWatch";
import { AppContext } from "../contexts/AppProvider";
import logo from "../assets/images/logo.png";
import pageBg1 from "../assets/images/page-bg/1.jpg";
export default function Header(props) {
  const [searchKey, setsearchKey] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("default");
  const history = useHistory();
  const { store } = useContext(AppContext);
  const [subject, setSubject] = useState([]);
  const [cat, setCat] = useState([]);
  useEffect(function () {
    async function loadAllSubject() {
      const res = await getAllSubject();
      console.log("allsubject laf");
      console.log(res.data);
      console.log("allsubject laf");
      setSubject(res.data);
    }
    async function loadAllCat() {
      const res = await getAllCat();
      console.log("allsubject laf");
      console.log(res.data);
      console.log("allsubject laf");
      setCat(res.data);
    }

    loadAllSubject();
    loadAllCat();
  }, []);

  const signOutBtn_Clicked = () => {
    delete localStorage.userEmail;
    delete localStorage.accessToken;
    delete localStorage.refreshToken;
    history.push("/");
  };
  const handleSearchKeyChanged = function (e) {
    setsearchKey(e.target.value);
  };
  const handleButton_click = function () {
    console.log(categoryFilter);
    history.push(
      `/courses/search?course=${searchKey}&categoryId=${categoryFilter}`
    );
  };
  const Cat_Click = function (catId) {
    history.push(`/courses/category/${catId}`);
  };
  const handleFilterByCategory = (e) => {
    console.log(e.target.value);
    setCategoryFilter(e.target.value);
  };

  return (
    <div>
      <div className=" set-bg top-container" data-setbg={pageBg1}>
        <nav class="secondary-menu">
          <div>
            <div class="sm-left">
              <strong>
                <i class="fa fa-phone"></i>
              </strong>{" "}
              <a href="#">+8412345678433</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <strong>
                <i class="fa fa-envelope"></i>
              </strong>{" "}
              <a href="#">webnccq2017bct@gmail.com</a>
            </div>
            <div class="sm-right">
              <div class="sm-social-link">
                <a class="h-facebook" href="#">
                  <i class="fa fa-facebook"></i>
                </a>
                <a class="h-twitter" href="#">
                  <i class="fa fa-twitter"></i>
                </a>
                <a class="h-google" href="#">
                  <i class="fa fa-google-plus"></i>
                </a>
                <a class="h-linkedin" href="#">
                  <i class="fa fa-linkedin"></i>
                </a>
              </div>
            </div>
            <div class="clearfix"></div>
          </div>
        </nav>
      </div>
      <header className="header-section header" id="myHeader">
        <div className="container">
          <div className="row">
            <div className="col-sm-2">
              <div className="site-logo">
                {/* <img src="img/logo.png" alt /> */}
                <Link to="/">
                  <a>
                    <img src={logo} alt />
                  </a>
                </Link>
              </div>
              <div className="nav-switch">
                <i className="fa fa-bars" />
              </div>
            </div>
            <div className="col-sm-4">
              <Form className="d-flex search-form">
                <FormControl
                  type="search"
                  placeholder="Course Name"
                  className="mr-2"
                  aria-label="Search"
                  onChange={handleSearchKeyChanged}
                />
                <FormSelect
                  onChange={(e) => handleFilterByCategory(e)}
                  defaultValue="default"
                >
                  <option value="default">All</option>
                  <option value={1}>Web Course</option>
                  <option value={2}>Mobile Course</option>
                </FormSelect>
                <Button variant="outline-primary" onClick={handleButton_click}>
                  <i class="fa fa-search"></i>
                </Button>
              </Form>
            </div>
            <div className="col-sm navbar-custom">
              <Nav className="">
                {/* <NavDropdown title="IT" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/courses/category/1" style={{ color: "#000" }}>
                      Web courses
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/courses/category/2" style={{ color: "#000" }}>
                      Mobile courses
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown> */}
                <Dropdown title="Category" position="right">
                  {subject.map((subject) => (
                    <Dropdown.Item position="right" className="text-primary">
                      {subject.name}
                      <Dropdown.Submenu position="right">
                        {cat.map((cat) =>
                          cat.subject_id === subject.subject_id ? (
                            <Dropdown.Item
                              onClick={() => Cat_Click(cat.category_id)}
                            >
                              {cat.category_name}
                            </Dropdown.Item>
                          ) : (
                            ""
                          )
                        )}
                      </Dropdown.Submenu>
                    </Dropdown.Item>
                  ))}
                </Dropdown>
                {localStorage.userEmail ? (
                  <>
                    <Nav.Link className="cart-nav">
                      <Link to="#">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
                        Cart
                      </Link>
                      <FrameCart />
                    </Nav.Link>
                    <Nav.Link className="watch-nav">
                      <Link to="#">
                        <i class="fa fa-heart" aria-hidden="true"></i> Wishlist
                      </Link>
                      <FrameWatch />
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/checkout">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
                        Checkout
                      </Link>
                    </Nav.Link>
                    <NavDropdown
                      title={<i class="fa fa-user"></i>}
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item>
                        <Link to="/settings" style={{ color: "#000" }}>
                          Settings
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to="/profile" style={{ color: "#000" }}>
                          Profile
                        </Link>
                      </NavDropdown.Item>
                      {localStorage.userRole === "lecturer" ? (
                        <>
                          <NavDropdown.Item>
                            <Link to="/mycourses" style={{ color: "#000" }}>
                              My courses
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link
                              to="/mysubcribecourses"
                              style={{ color: "#000" }}
                            >
                              My subscribe courses
                            </Link>
                          </NavDropdown.Item>
                        </>
                      ) : (
                        <NavDropdown.Item>
                          <Link
                            to="/mysubcribecourses"
                            style={{ color: "#000" }}
                          >
                            My subscribe courses
                          </Link>
                        </NavDropdown.Item>
                      )}
                      <NavDropdown.Item onClick={signOutBtn_Clicked}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <Nav.Link>
                    <Link to="/login">Login</Link>
                  </Nav.Link>
                )}
              </Nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
