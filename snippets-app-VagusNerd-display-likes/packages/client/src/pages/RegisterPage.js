import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Button,
} from 'react-bootstrap'
import useRouter from 'hooks/useRouter'
import { useProvideAuth } from 'hooks/useAuth'
import { LandingHeader, LoadingSpinner } from 'components'
import { setAuthToken } from 'utils/axiosConfig'
import AvatarPicker from '../components/AvatarPicker.js'

const initialState = {
  username: '',
  password: '',
  profile_image: null,
  isSubmitting: false,
  errorMessage: null,
}

export default function RegisterPage() {
  const [data, setData] = useState(initialState)
  const auth = useProvideAuth()
  const router = useRouter()

  const [profileImage, setProfileImage] = useState(null)

  function getRandomProfileUrl() {
    //geneartes random pic in img
    let imgs = [
      'bird.svg',
      'dog.svg',
      'fox.svg',
      'frog.svg',
      'lion.svg',
      'owl.svg',
      'tiger.svg',
      'whale.svg',
    ]
    let img = imgs[Math.floor(Math.random() * imgs.length)]
    return `/${img}`
  }

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleSignup = async (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()

    if (form.checkValidity() === false) {
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })
    setProfileImage(profileImage)
    try {
      const res = await auth.signup(data.username, data.password, profileImage, data.confirm_password, data.email)
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: null,
      })
      setAuthToken(res.token)
      router.push('/')
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null,
      })
    }
  }

  return (
    <div style={{overflow: "auto", height: "100vh"}}>
      <LandingHeader/>
      <Container className='mb-5'>
        <Row className='pt-5 justify-content-center'>
            <Form
                noValidate
                validated
                style={{ width: '350px' }}
                onSubmit={handleSignup}
            >
                <h3 className="mb-3">Join Us!</h3>
                <Form.Group controlId='username-register'>
                <Form.Label>Username</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                    type='text'
                    name='username'
                    placeholder='Username'
                    aria-describedby='inputGroupPrepend'
                    required
                    value={data.username}
                    onChange={handleInputChange}
                    />
                </InputGroup>
                <Form.Label htmlFor='email'>Email</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    required
                    value={data.email}
                    onChange={handleInputChange}
                    placeholder='Enter your email'
                  />
                </Form.Group>
                <Form.Group>
                <Form.Label htmlFor='Register'>Password</Form.Label>
                <Form.Control
                    type='password'
                    name='password'
                    required
                    id='inputPasswordRegister'
                    value={data.password}
                    onChange={handleInputChange}
                />
                <Form.Label htmlFor='confirm_password'>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='confirm_password'
                    required
                    value={data.confirm_password}
                    onChange={handleInputChange}
                    placeholder='Enter new password again...'
                />
                {/* ////////// AvatarPicker Component */}
                <AvatarPicker profile_image={profileImage} setProfileImage={setProfileImage} />
                </Form.Group>
                {data.errorMessage && (
                <span className='form-error text-warning'>{data.errorMessage}</span>
                )}
                <Row className='mr-0'>
                <Col>
                    Already Registered?
                    <Button
                    as='a'
                    variant='link'
                    onClick={() => router.push("/login")}
                    >
                    Login
                    </Button>
                </Col>
                <Button type='submit' disabled={data.isSubmitting}>
                    {data.isSubmitting ? <LoadingSpinner /> : 'Sign up'}
                </Button>
                </Row>
            </Form>
        </Row>
      </Container>
    </div>
  )
}
