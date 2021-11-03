import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Jumbotron, Button } from 'react-bootstrap'
import useRouter from 'hooks/useRouter'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

export default function LandingHeader({login}) {
    const router = useRouter();
    return (
        <Jumbotron
            fluid
            className='text-info'
            style={{
                backgroundImage: "url('/hero-bg-blue.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: '50% 20%',
                height: '350px',
            }}
        >
            <Container className='hero-text position-relative'>
                <Row>
                    <Col xs={12} lg={8}>
                        <Row>
                        <img src='/logo.png' alt='logo' width='300px' onClick={()=>{router.push("/")}} style={{cursor: "pointer"}}/>
                        </Row>
                        <Row>
                            <p className='mt-2 lead'
                                style={{ color: 'white'}}
                            >
                                A place to engage with the Kenzie fam
                            </p>
                        </Row>
                    </Col>
                    { login && (
                        <Col xs={12} lg={4} className="pt-4">
                            <LinkContainer
                                to='/login'
                                className="float-lg-right float-xs-none mx-3"
                            >
                                <Button variant='outline-primary'>Login</Button>
                            </LinkContainer>
                            <LinkContainer
                                to='/register'
                                className="float-lg-right float-xs-none mx-3"
                            >
                                <Button variant='primary'>Register</Button>
                            </LinkContainer>
                        </Col>
                    )}
                </Row>
            </Container>
        </Jumbotron>
    )
}
