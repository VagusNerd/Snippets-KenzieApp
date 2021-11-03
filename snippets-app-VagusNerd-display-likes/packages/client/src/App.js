import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LandingPage, LoginPage, PostDetailPage, RegisterPage, UserDetailPage } from 'pages'
import { ErrorBoundary, Feed, Header } from 'components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useProvideAuth } from 'hooks/useAuth'
import { Container, Row, Col } from 'react-bootstrap'

function App() {
  const {
    state: { user }
  } = useProvideAuth()

  return (
    <ErrorBoundary>
      <ToastContainer />
      {
        user ? (
          <>
            <Header />
            <Container fluid style={{
              height: "calc(100vh - 72px)",
              overflow: "auto"
            }}>
              <Row>
                <Col xs={0} md={2} xl={3}/>
                <Col xs={12} md={8} xl={6}>
                  <Switch>
                    <Route exact path='/u/:uid' component={UserDetailPage} />
                    <Route exact path='/p/:pid' component={PostDetailPage} />
                    <Route exact path='/' component={Feed} />
                    <Route exact path='/login'>
                      <Redirect to="/"/>
                    </Route>
                    <Route exact path='/register'>
                      <Redirect to="/"/>
                    </Route>
                    <Route
                      component={({ location }) => {
                        return (
                          <div
                            style={{
                              padding: '50px',
                              width: '100%',
                              textAlign: 'center',
                            }}
                          >
                            The page <code>{location.pathname}</code> could not be found.
                          </div>
                        )
                      }}
                    />
                  </Switch>
                </Col>
                <Col xs={0} md={2} xl={3}/>
              </Row>
            </Container>
          </>
        ):(
          <Switch>
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
            <Route path='/' component={LandingPage} />
          </Switch>
        )
      }
    </ErrorBoundary>
  )
}

export default App
