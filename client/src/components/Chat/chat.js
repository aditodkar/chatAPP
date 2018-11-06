import React, { Component } from 'react'
import './chat.css'
import io from "socket.io-client";
import { connect } from 'react-redux';
import { saveAuthor } from '../../store/actions/authorAction'
import { saveMessages } from '../../store/actions/messageAction'
import { deleteAuthor } from '../../store/actions/deleteAuthorAction'
import { fetchUsers } from '../../store/actions/userAction'
import { removeMessages } from '../../store/actions/removemessagesAction'
// import { showMessages } from '../../store/actions/showMessagesAction'
 
class Chat extends Component {

    constructor(props){
        super(props);

        this.state = {
            message: '',
            date: '',
            author: '',
            messages: []
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.addMessage = this.addMessage.bind(this);

        this.socket = io('localhost:5000');
        this.socket.emit('LOGGEDIN_USER', { user1: this.props.match.params.user});
    }

    componentDidMount() {
      this.props.fetchUsers();
      this.socket.on('RECEIVE_MESSAGE', data => {
          console.log(data);
          this.addMessage(data);
      });
      
      this.socket.emit('LOGGEDIN_USER', { user1: this.props.match.params.user});
    //   this.socket.emit('USER_ID', {
    //     userId: this.props.match.params.user
    //   });
    }

    sendMessage(event) {
      event.preventDefault();

      if(this.state.message !== ''){
        this.socket.emit('SEND_MESSAGE', {
            author: this.props.match.params.user,
            message: this.state.message,
            date: Date.now()
        });

        // this.socket.emit('LOGGEDIN_USER', { user1: this.props.match.params.user});

        // this.socket.emit('TYPING', {
        //     typing: this.props.match.params.user
        // })
        
      }
    };

    addMessage(data) {
      console.log(data);
      this.props.saveAuthor(this.props.match.params.user)
      this.props.saveMessages(data)
    
      this.setState({
        message: ''
      });
      //console.log(this.state.message);
    //console.log(this.state.messages);
    };

    handleClick = (userName) => {
        // console.log(userName)

        // this.socket.emit('GET_USER2', {
        //     user2: userName
        // });

        // this.socket.emit('LOGGEDIN_USER', { user1: this.props.match.params.user});
        this.props.removeMessages()
        this.socket.emit('GET_USER', { user2: userName });
    
    }

    render() {
        //console.log(this.props)
        return (
        <div>
            <h2>Hello {this.props.match.params.user}</h2>
            <div className="container">
                <div id="chat">
                    <div className="card">
                        <div id="messages" className="card-block">
                            { this.props.messages && this.props.messages.map((message, index) => {

                                if(message.author === this.props.match.params.user){
                                    return (
                                        <div key={index} className="msgBoxRight"><p className="msgTextRight">{message.message}</p></div>
                                    )
                                }else{
                                    return (
                                        <div key={index} className="msgBoxLeft"><p className="msgTextLeft">{message.message}</p></div>
                                    ) 
                                }  
                            })}
                        </div>
                        <div id="feedback"></div>
                            <div className="row">
                            <div className="column">
                                <input id="inputmsg" type="text" placeholder="Enter Message...."
                                value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                            </div>
                            <div className="column2">
                                <button id="send" className="button" onClick={this.sendMessage}>Send</button>
                            </div>
                            <div className="upload">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="userlist">
                <div>
                    <h3>All users:</h3>
                    {this.props.match.params.user ? this.props.allusers.map((val,index) => {
              
                    if(this.props.match.params.user === val.username){
                        return null
                    }else {
                        return <div className="usernameList" key={index}><button onClick={() => this.handleClick(val.username)} type="button">{val.username}</button></div>
                    }
                    }) : ""}
                </div>
                </div>
            </div>
        </div>
        )
    }
}


const mapStateToProps = state => ({
    author: state.chat.author,
    messages: state.chat.messages,
    allusers: state.allusers.items
})

export default connect (mapStateToProps, { saveAuthor, saveMessages, deleteAuthor, fetchUsers, removeMessages })(Chat);