import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from "../responsive"
import { publicRequest } from '../functions/axiosInstance'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("assets/images/register-bg.jpg") center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: #FFF;
    ${mobile({ width: '75%' })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px auto;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: #FFF;
    cursor: pointer;
    ${mobile({ width: '60%' })}
`

const Link = styled.a`
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`

const ErrorText = styled.span`
    color: red;
    font-size: 12px;
    margin-top: 10px;
`

const Register = () => {
    let navigate = useNavigate();
    const [fields, setFields] = useState({});
    const [error, setError] = useState('')

    const changeRoute = () => {
        navigate('/login')
    }

    const handleChange = (e) => {
        setFields({ 
            ...fields, 
            [e.target.name]: e.target.value 
        });
    }

    const validateInputFields = () => {
        if (fields.email && fields.password && fields.confirm_password && fields.first_name && fields.last_name) {
            return true;
        }
        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateInputFields()) {
            if (fields.password !== fields.confirm_password) {
                setError('Passwords do not match')
            } else {
                const { confirm_password, ...others } = fields
                try {
                    const res = await publicRequest.post('/auth/register', others);
                    const { success, message } = res.data;
                    if (success) {
                        navigate('/login')
                    } else {
                        setError(message)
                    }
                } catch (error) {
                    console.log(error)
                    setError(error.message)
                }
            }
        } else {
            setError('Please fill all fields')
        }
        setTimeout(() => {
            setError('')
        }, 2000);
    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="First Name" name="first_name" onChange={handleChange} />
                    <Input placeholder="Last Name" name="last_name" onChange={handleChange} />
                    <Input placeholder="Username" name="username" onChange={handleChange} />
                    <Input placeholder="Email" name="email" onChange={handleChange} />
                    <Input type="password" placeholder="Password" name="password" onChange={handleChange} />
                    <Input type="password" placeholder="Confirm Password" name='confirm_password' onChange={handleChange} />
                    <ErrorText>{ error !== '' && error }</ErrorText>
                    <Agreement>By creating an account, I consent to the processing of my personal data in accordance with the <strong>PRIVACY POLICY</strong></Agreement>
                    <Button onClick={(e) => handleSubmit(e)}>CREATE ACCOUNT</Button>
                </Form>
                <Link onClick={() => changeRoute()}>ALREADY HAVE AN ACCOUNT?</Link>
            </Wrapper>
        </Container>
    )
}

export default Register
