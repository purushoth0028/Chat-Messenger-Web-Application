import React from 'react'
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export default function Forgot() {
  const initialState = {
    email: '',
  }

  const [forgotUserState, setRegisterUserState] = React.useState(initialState)
  const [errors, setErrors] = React.useState([])
  const [status, setStatus] = React.useState('')

  const handleChange = event => {
    setRegisterUserState({
      ...forgotUserState,
      [event.target.name]: event.target.value,
    })
  }

  const onSubmit = async event => {
    event.preventDefault()
    const errors = []
    if (formIsValid(forgotUserState)) {
      const { email } = forgotUserState
      setErrors(errors)
      setStatus('PENDING')
     

      try {
        await firebase.auth().sendPasswordResetEmail(email)
        setStatus('RESOLVED')
        toast("Password reset link is sent to your e-mail")

      } catch (err) {
        setStatus('RESOLVED')
        setErrors(errors.concat({ message: err.message }))
      }
    } else {
      let error = { message: 'Please fill the form' }
      setErrors(errors.concat(error))
    }
  }

  const formIsValid = ({ email}) => {
    return email
  }

  const handleInputError = (errors, inputName) => {
    return errors.some(err =>
      err.message.toLowerCase().includes(inputName.toLowerCase())
    )
      ? 'error'
      : ''
  }

  const { email } = forgotUserState

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 510 }}>
        <Header as="h2" color="black" textAlign="center">
          <Icon name="puzzle piece" color="black" />
          Reset the Password for Chat Messenger
        </Header>
        <Form size="large" onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              type="email"
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className={handleInputError(errors, 'email')}
            />
            <Button
              disabled={status === 'PENDING'}
              className={status === 'PENDING' ? 'loading' : ''}
              type="submit"
              fluid
              color="black"
              size="large"
             >
              Submit
            </Button>
        <ToastContainer/>
          </Segment>
        </Form>
        <Message>
          Back to Login? <Link to="/login">Login</Link>{' '}
        </Message>
      </Grid.Column>
    </Grid>
  )
}