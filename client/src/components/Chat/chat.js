import React, { Component } from 'react'
import './chat.css'
import io from "socket.io-client";

export default class Chat extends Component {

    constructor(props){
        super(props);

        this.state = {
            message: '',
            date: '',
            messages: []
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.addMessage = this.addMessage.bind(this);

        this.socket = io('localhost:5000');
    }

    componentDidMount() {
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
            message: this.props.match.params.user + '#' + this.state.message,
            date: Date.now()
        });

        this.socket.emit('TYPING', {
            typing: this.props.match.params.user
        })
        
      }
    };

    addMessage(data) {
      //console.log(data);
      this.setState({
        messages: [...this.state.messages, ...data],
        message: '', 
        date: ''
      });
      //console.log(this.state.message);
    //   console.log(this.state.messages);
    };

    render() {
        return (
        <div>
            <h2>Hello {this.props.match.params.user}</h2>
                <div id="chat">
                    <div className="card">
                        <div id="messages" className="card-block">
                            {this.state.messages.map((message, index) => {

                                let word = message.message.split('#')

                                if(word[0] === this.props.match.params.user){
                                    return (
                                        <div key={index} className="msgBoxRight"><p className="msgTextRight">{word[1]}</p></div>
                                    )
                                }else{
                                    return (
                                        <div key={index} className="msgBoxLeft"><p className="msgTextLeft">{word[1]}</p></div>
                                    ) 
                                }  
                            })}
                        </div>
                        <div id="feedback"></div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <input id="inputmsg" type="text" placeholder="Enter Message...."
                            value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                        </div>
                        <div className="column2">
                            <button id="send" className="button" onClick={this.sendMessage}>Send</button>
                        </div>
                        <div className="upload">
                            <form action="/action_page.php">
                                <input type="file" name="pic" accept="image/*"/>
                                <input type="submit"/>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
        )
    }
}