import React, { Component } from 'react'
import './login.css'

export default class Login extends Component {
  render() {
    return (
      <div>
          {/* <form>
            <div id="fname">
              <label for="fname">First Name</label>
              <input type="text" name="firstname" placeholder="Your name.."/>
            </div>

            <div id="lname">
              <label for="lname">Last Name</label>
              <input type="text" name="lastname" placeholder="Your last name.."/>
            </div>
            
            <div id="email">
              <label for="email">Email ID</label>
              <input type="text" name="email" placeholder="Your email id ..."/>
            </div>
          
            <input id="submit" type="submit" value="Submit"/>
          </form> */}
          
          <form>
              <label for="fname">First Name</label>
              <input id="fname" type="text" name="firstname" placeholder="Your name.."/>

              <label for="lname">Last Name</label>
              <input id="lname" type="text" name="lastname" placeholder="Your last name.."/>
            
              <label for="email">Email ID</label>
              <input id="email" type="text" name="email" placeholder="Your email id ..."/>
          
              <input id="submit" type="submit" value="Submit"/>
          </form> 


      </div>
    )
  }
}
