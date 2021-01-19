import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { logged, setLogged } from "../../redux/Global";

/*
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logged, setLogged } from "../../redux/Global";



export default function Box1() {
  const dispatch = useDispatch();
  const cnt = useSelector(logged);

  const inc = () => {
    dispatch(setLogged(cnt + 1));
  };
  return cnt;
  return (
    <div className="box">
      <button onClick={() => inc()}>Increase by 1</button>
      <p>Counter: {cnt}</p>
    </div>
  );
}


*/

const Users = props => (
  <tr>
    <td>{props.user.Name}</td>
    <td>{props.user.FamilyName}</td>
    <td>{props.user.Email}</td>
    <td>{props.user.Password}</td>
    <td>
      <Link to={"/edit/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
    </td>
  </tr>
)

export default class HomePage extends Component {
  
  constructor(props) {
    super(props);
    
    this.deleteUser = this.deleteUser.bind(this)
    this.state = {users: []};
  }
  getUser = () =>{
    return 1;//mapStateToProps.Counter;//"1";//Box1.Box1;
  }
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteUser(id) {
    axios.delete('http://localhost:5000/users/'+id)
      .then(response => { console.log(response.data)});
'///'
    this.setState({
        users: this.state.users.filter(el => el._id !== id)
    })
  }

  usersList() {
    return this.state.users.map(currentuser => {
      return <Users user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
    })
  }

  render() {
    return (
      <div style= {{background:"#ffffff"}}>
        <h3>Logged Accounts</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name +{localStorage.getItem('name')} </th>
              <th>Family Name {this.getUser()}</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            { this.usersList() }
          </tbody>
        </table>
      </div>
    )
  }
}