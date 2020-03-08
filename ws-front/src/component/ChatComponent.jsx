import React, {useState} from 'react'
import {Link} from "react-router-dom";
import Room1Component from "./Room1Component";
import Room2Component from "./Room2Component";
import Room3Component from "./Room3Component";
import {Container, Row, Col} from 'react-bootstrap'

const ChatComponent = (props) => {

    const [chanel, setChanel] = useState(0)
    console.log('render')
    let room;

    if (chanel === 1) {
        room = <Room1Component/>
    } else if (chanel === 2) {
        room = <Room2Component/>
    } else if (chanel === 3) {
        room = <Room3Component/>
    }
    return (

        //     div {
        //     position: fixed;
        //     top: 0;
        //     left: 0;
        //     width: 100%;
        //     height: 100%;
        // }

        <div className="container"
            // style={{ position: "fixed",
            // width: '100%', height: '100%',
            // backgroundImage: 'url(./chat-back-img.jpg)' }}
        >

            <Container>
                <br/>
                <h3><b>Сhannels:</b></h3>
                <br/>
                <Row>
                    <Col xs={6} md={4}>
                        <button style={{width: '100%'}} className="btn btn-success" onClick={() => {
                            setChanel(1)
                        }}>Room1</button>
                    </Col>

                    <Col xs={6} md={4}>
                        <button style={{width: '100%'}} className="btn btn-primary" onClick={() => {
                            setChanel(2)
                        }}>Room2</button>
                    </Col>

                    <Col xs={6} md={4}>
                        <button style={{width: '100%'}} className="btn btn-danger" onClick={() => {
                            setChanel(3)
                        }}>Room3</button>
                    </Col>
                </Row>

                <div>
                    {room}
                </div>

            </Container>

            {}

        </div>
    )
}

export default ChatComponent
