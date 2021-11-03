import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    ListGroup,
    Form
  } from 'react-bootstrap'
  import "./index.css" 


export default function PickAvatar(props) {

    let imgs = [
        '/bird.svg',
        '/dog.svg',
        '/fox.svg',
        '/frog.svg',
        '/lion.svg',
        '/owl.svg',
        '/tiger.svg',
        '/whale.svg',
    ]

    function toggleSelected(event, index) {
        event.preventDefault()
        let image = event.target.getAttribute('src')
        props.setProfileImage(image)
    }

    return (
        <Container>
            <Form>
                <Form.Text>Choose your avatar</Form.Text>
            <Row>
                {imgs.map((i, index) => {
                    return(
                        <div>
                            <Form.Group>
                                <input
                                    type='image' 
                                    className="avatar-pic" 
                                    id={index} 
                                    onClick={(event)=> {toggleSelected(event, index)}} 
                                    src={i} 
                                />
                            </Form.Group>
                        </div>
                    )
                })}
            </Row>
            </Form>
        </Container>
    )
}