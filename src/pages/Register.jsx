import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from "../responsive"

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

const Register = () => {
    let navigate = useNavigate();

    const changeRoute = () => {
        navigate('/login')
    }
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                    <Input placeholder="Username" />
                    <Input placeholder="Email" />
                    <Input placeholder="Password" />
                    <Input placeholder="Confirm Password" />
                    <Agreement>By creating an account, I consent to the processing of my personal data in accordance with the <strong>PRIVACY POLICY</strong></Agreement>
                    <Button>CREATE ACCOUNT</Button>
                </Form>
                <Link onClick={() => changeRoute()}>ALREADY HAVE AN ACCOUNT?</Link>
            </Wrapper>
        </Container>
    )
}

export default Register
