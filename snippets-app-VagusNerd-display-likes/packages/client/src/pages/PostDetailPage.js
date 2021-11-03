import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { LoadingSpinner, Post } from 'components'
import { useRequireAuth } from 'hooks/useRequireAuth'
import axios from 'utils/axiosConfig.js'

export default function PostDetailPage({
  match: {
    params: { pid },
  },
  history
}) {
  const [post, setPost] = useState()
  const [loading, setLoading] = useState(true)

  const {
    state: { isAuthenticated },
  } = useRequireAuth()

  useEffect(() => {
    const getPost = async () => {
      try {
        const postDetail = await axios.get(`posts/${pid}`)
        setPost(postDetail.data)
        setLoading(false)
      } catch (err) {
        console.error(err.message)
      }
    }
    isAuthenticated && getPost()
  }, [pid, isAuthenticated])

  if (!isAuthenticated) {
    return <LoadingSpinner full />
  }

  if (loading) {
    return <LoadingSpinner full />
  }

  return (
    <Container>
      <Button variant='outline-info' onClick={()=>{history.goBack()}}
        style={{border:'none', color: '#E5E1DF'}}
        className="mt-3"
        >
        Go Back
      </Button>
      <Post post={post} detail />
    </Container>
  )
}
