import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Header.css";
import Table from 'react-bootstrap/Table';

function Header() {
  return (
    <div className="Main_bg">
      <div className="fl">
        <div className="card card_w">
          <div className="cad-body">
            <h5 className="h1">Log in to Your Account </h5>
            <input
              type="text"
              className="input_"
              placeholder="Enter your name"
            />
            <br />
            <input
              type="password"
              className="input_"
              placeholder="Enter your password"
              name=""
              id=""
            />
            <br />
            <button className="btn btn_f ">Login</button>
            <br />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
          <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          {Array.from({ length: 12 }).map((_, index) => (
            <th key={index}>Table heading</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          {Array.from({ length: 12 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>2</td>
          {Array.from({ length: 12 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>3</td>
          {Array.from({ length: 12 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
      </tbody>
    </Table>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Header;
