import React, { Component } from 'react'
import './login.css'
import { connect } from 'react-redux';
import { createUser } from '../../store/actions/loginAction';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstName:'',
      lastName:'',
      email:''
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitHandler(e){
    e.preventDefault();
    this.props.createUser(this.state)
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <label>
            FirstName:
            <input type="text" name="firstName" value={this.state.firstName} onChange={this.onChangeHandler} />
          </label>

          <label>
            LastName:
            <input type="text" name="lastName" value={this.state.lastName} onChange={this.onChangeHandler} />
          </label>

          <label>
            Email:
            <input type="text" name="email" value={this.state.email} onChange={this.onChangeHandler} />
          </label>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect (mapStateToProps, { createUser })(Login);