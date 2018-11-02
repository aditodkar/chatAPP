import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../store/actions/userAction'

class UserList extends Component {

  componentDidMount (){
    this.props.fetchUsers();
  }

  render() {
   
    return (
      <div>
        <div>
            <h3>All users:</h3>
            
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users.items
})

export default connect (mapStateToProps, { fetchUsers })(UserList);
