import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../store/actions/userAction'
import './userlist.css'

const DisplayUsers = ({username}) => (
  <div className="usernameList">
    <button type="button">{username}</button>
  </div>
)

class UserList extends Component {

  componentDidMount (){
    this.props.fetchUsers();
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div>
            <h3>All users:</h3>
            {this.props.allusers ? this.props.allusers.map(val => {
              
              if(this.props.currentUser === val.username){
                return null
              }else {
                return <DisplayUsers username={val.username}/>
              }
            }) : ""}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allusers: state.allusers.items
})

export default connect (mapStateToProps, { fetchUsers })(UserList);
