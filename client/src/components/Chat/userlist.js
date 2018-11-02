import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../store/actions/userAction'

class UserList extends Component {

  componentDidMount (){
    this.props.fetchUsers();
  }

  render() {
    console.log(this.props.allusers)
    return (
      <div>
        <div>
            <h3>All users:</h3>
            {/* {this.props.allusers && this.props.allusers[0] ? this.props.allusers[0].email : ""} */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allusers: state.allusers.items
})

export default connect (mapStateToProps, { fetchUsers })(UserList);
