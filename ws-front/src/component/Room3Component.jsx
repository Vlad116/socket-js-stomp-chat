import React, {Component} from 'react'
import SockJsClient from 'react-stomp';
import {TalkBox} from "react-talk";
import Fetch from "json-fetch";
import {Col, Row} from "react-bootstrap";

class Room3Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientRef: null,
            ws: null,
            messages: [],
            text: '',
            clientConnected: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    onMessageReceive = (msg, topic) => {
        this.setState(prevState => ({
            messages: [...prevState.messages, msg]
        }));
    }

    componentWillMount() {
        Fetch("/history/" + "room3", {
            method: "GET"
        }).then((response) => {
            this.setState({messages: response.body});
        });
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    sendMessage = (msg, selfMsg) => {
        try {
            this.clientRef.sendMessage("/app/room/" + "room3", JSON.stringify(selfMsg));
            return true;
        } catch (e) {
            return false;
        }
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <br/>
                <br/>
                <Row>
                    <Col xs={8} md={12}>
                        <TalkBox style={{width: '100%'}}
                                 topic="Room 3"
                                 currentUserId={localStorage.getItem("AUTH")}
                                 currentUser={localStorage.getItem("authenticatedUser")}
                                 messages={this.state.messages}
                                 onSendMessage={this.sendMessage}
                                 connected={this.state.clientConnected}/>
                        <SockJsClient url={"http://localhost:8080/messages"}
                                      topics={["/topic/room/room3"]}
                                      onMessage={this.onMessageReceive}
                                      ref={(client) => {
                                          this.clientRef = client
                                      }}
                                      onConnect={() => {
                                          this.setState({clientConnected: true});
                                      }}
                                      onDisconnect={() => {
                                          this.setState({clientConnected: false})
                                      }}
                                      debug={true}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Room3Component