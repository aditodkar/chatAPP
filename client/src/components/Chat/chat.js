import React, { Component } from 'react'
import './chat.css'
import io from "socket.io-client";
import { connect } from 'react-redux';
import { saveAuthor } from '../../store/actions/authorAction'
import { saveMessages } from '../../store/actions/messageAction'
import { deleteAuthor } from '../../store/actions/deleteAuthorAction'
import { deleteMessage } from '../../store/actions/deletemessageAction'
import { fetchUsers } from '../../store/actions/userAction'

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
    }

    componentDidMount() {
      this.props.fetchUsers();
      this.socket.on('RECEIVE_MESSAGE', data => {
          console.log(data);
          this.addMessage(data);
      });
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

        // this.socket.emit('TYPING', {
        //     typing: this.props.match.params.user
        // })
        
      }
    };

    addMessage(data) {
      //console.log(data);
      this.props.saveAuthor(this.state.author)
      this.props.deleteMessage()
      this.props.saveMessages(data)
    
      //   this.setState({
    //     messages: [...this.state.messages, ...data],
    //     //message: '', 
    //     date: ''
    //   });
      //console.log(this.state.message);
    //console.log(this.state.messages);
    };

    render() {
        console.log(this.props)
        return (
        <div>
            <h2>Hello {this.props.match.params.user}</h2>
            <div className="container">
                <div id="chat">
                    <div className="card">
                        <div id="messages" className="card-block">
                            { this.props.messages && this.props.messages.messages && this.props.messages.messages.map((message, index) => {

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
                            {/* {this.props.messages.messages.map((message, index) => {

                            if(message.author === this.props.match.params.user){
                                return (
                                    <div key={index} className="msgBoxRight"><p className="msgTextRight">{message.message}</p></div>
                                )
                            }else{
                                return (
                                    <div key={index} className="msgBoxLeft"><p className="msgTextLeft">{message.message}</p></div>
                                ) 
                            }  
                            })} */}
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
                    {this.props.allusers ? this.props.allusers.map((val,index) => {
              
                    if(this.props.currentUser === val.username){
                        return null
                    }else {
                        return <div className="usernameList" key={index}><button onClick={this.handleClick} type="button">{val.username}</button></div>
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
    message: state.chat.message,
    allusers: state.allusers.items
})

export default connect (mapStateToProps, { saveAuthor, saveMessages, deleteAuthor, deleteMessage, fetchUsers })(Chat);