import React, { Component } from "react";
import "./register.css";


class Register extends Component{

  constructor(s){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { user: [], token: '' }
  }

  handleChange(e){
          this.setState({
            [e.target.name]: e.target.value
              })
  }
  handleSubmit(e){
    e.preventDefault();
    let reqBody = {
      email: this.refs.email.value,
      password: this.refs.password.value,
      confirmPassword: this.refs.confirmPassword.value
    };
    fetch("/api/v1/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(reqBody)
    })
      .then((res) => {
        if (res.ok){
        window.location.replace("./login")
          return res.json();
        } else {
          throw new Error ('Something went wrong with your fetch');
        }
      })
  }


render(){
    return (
        <div id="wrapper">
           <form onSubmit={this.handleSubmit} id="login">
            <div className="d-inline-flex flex-column justify-content-center">
            <div className="p-2">
              <label >Email:</label>
              <input ref="email" className="form-control" placeholder="Email Address" type="email"  required="true"/>
            </div>
            <div className="p-2">
              <label>Password:</label>
              <input ref="password" type="password" required="true"/>
            </div>
            <div className="p-2">
              <label>Confirm:</label>
              <input ref="confirmPassword" className="form-control" placeholder="Password" type="password"required="true"/>
            </div>
            <div className="p-2">
              <input type="submit" value="Register"/>
            </div>
            </div>
          </form>
        </div>
    );
  }
}

export default Register;
