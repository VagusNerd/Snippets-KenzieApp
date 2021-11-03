import React, { useState, useEffect } from 'react'
import {
  Container,
  Card,
  Form,
  Button,
  Collapse,
  Figure
} from 'react-bootstrap'
import { LoadingSpinner, Post } from 'components'
import { useProvideAuth } from 'hooks/useAuth'
import { useRequireAuth } from 'hooks/useRequireAuth'
import axios from 'utils/axiosConfig.js'
import { toast } from 'react-toastify'
import AvatarPicker from '../components/AvatarPicker.js'

export default function UserDetailPage({
  match: {
    params: { uid },
  },
  history
}) {
  const { state } = useProvideAuth()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [validated, setValidated] = useState(false)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    current_password: '',
    confirm_password: '',
    password: '',
    isSubmitting: false,
    errorMessage: null,
  })

  const [profileImage, setProfileImage] = useState(null)


  const {
    state: { isAuthenticated },
  } = useRequireAuth()

  useEffect(() => {
    const getUser = async () => {
      try {
        const userResponse = await axios.get(`users/${uid}`)
        setUser(userResponse.data)
        setLoading(false)
      } catch (err) {
        console.error(err.message)
      }
    }
    isAuthenticated && getUser()
  }, [uid, isAuthenticated])


  const handleInputChange = async (event) => {
    await setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleUpdatePassword = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    // handle invalid or empty form
    if (form.checkValidity() === false) {
      setValidated(true)
      return
    }
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })
    try {
      // write code to call edit user endpoint 'users/:id'
      const {
        user: { uid, username },
      } = state
      console.log(data.password, uid, username)

      await axios.put(`/users/${uid}`, { password:data.password, current_password:data.current_password, confirm_password:data.confirm_password })
      toast.success("Your password has been successfully updated!")
      setLoading(true)
      history.push("/")

      setValidated(false)
      // don't forget to update loading state and alert success
    } catch (error) {
      toast.warn(error.message)
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message,
      })
    }
  }

  const handleUpdateProfileImage = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })
    setProfileImage(profileImage)
    try {
      // write code to call edit user endpoint 'users/:id'
      const {
        user: { uid, username },
      } = state
      console.log(profileImage, uid, username)

      await axios.put(`/users/${uid}`, {profile_image:profileImage})
      toast.success("Your profile image has been successfully updated!")
      setLoading(true)
      history.push("/")

      setValidated(false)
      // don't forget to update loading state and alert success
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message,
      })
    }
  }

  if (!isAuthenticated) {
    return <LoadingSpinner full />
  }

  if (loading) {
    return <LoadingSpinner full />
  }

  return (
    <>
    <Container className='clearfix'>
      <Button variant='outline-info' onClick={()=>{history.goBack()}}
        style={{border:'none', color: '#E5E1DF'}}
        className="mt-3 mb-3"
        >
        Go Back
      </Button>
      <Card bg='header' className='text-center'>
        <Card.Body>
          <Figure
            className='bg-border-color rounded-circle overflow-hidden my-auto ml-2 p-1'
            style={{
              height: '50px',
              width: '50px',
              backgroundColor: 'white',
            }}
          >
            <Figure.Image
              src={user.profile_image}
              className='w-100 h-100'
            />
          </Figure>
          <Card.Title>{uid}</Card.Title>
          <span>{user.email}</span>
          {state.user.username === uid && (
            <div onClick={() => setOpen(!open)} style={{cursor: 'pointer', color: '#BFBFBF'}}>Edit Profile</div>
          )}
          { open && (
            <Container animation="false">
              <div className='row justify-content-center p-4'>
                <div className='col text-center'>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleUpdatePassword}
                  >
                  {/* ///////////Avatar Picker components */}
                  <Form.Group>
                    <AvatarPicker profile_image={profileImage} setProfileImage={setProfileImage} />
                    <Button type='submit' disable={data.isSubmitting} onClick={handleUpdateProfileImage}>
                      {data.isSubmitting ? <LoadingSpinner /> : 'Update Avatar'} 
                    </Button>
                  </Form.Group>
                  </Form>

                  <Form>
                    <Form.Group>
                    <Form.Label htmlFor='current_password'>Current Password</Form.Label>
                      <Form.Control
                        type='password'
                        name='current_password'
                        required
                        value={data.current_password}
                        onChange={handleInputChange}
                        placeholder="Enter your current password..."
                      />
                    
                    {/* / Password Input fields / */}
                    
                      <Form.Label htmlFor='password'>New Password</Form.Label>
                        <Form.Control
                          type='password'
                          name='password'
                          required
                          value={data.password}
                          onChange={handleInputChange}
                          placeholder="Enter new password..."
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
                      <Form.Control.Feedback type='invalid'>
                        New Password is required
                      </Form.Control.Feedback>
                      <Form.Text id='passwordHelpBlock' muted>
                        Must be 8-20 characters long.
                      </Form.Text>
                    </Form.Group>

                    {data.errorMessage && (
                      <span className='form-error'>{data.errorMessage}</span>
                    )}
                    <Button type='submit' disabled={data.isSubmitting} onClick={handleUpdatePassword}>
                      {data.isSubmitting ? <LoadingSpinner /> : 'Update Password'}
                    </Button>
                  </Form>
                </div>
              </div>
            </Container>
          )}
        </Card.Body>
      </Card>
    </Container>
    <Container
      className='pt-3 pb-3'
    >
      {user.posts.length !== 0 ? (
        user.posts.map((post) => <Post key={post._id} post={post} userDetail/>)
      ) : (
        <div
          style={{
            marginTop: '75px',
            textAlign: 'center',
          }}
        >
          No User Posts
        </div>
      )}
    </Container>
    </>
  )
}
