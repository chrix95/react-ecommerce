import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { mobile } from "../responsive"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("assets/images/login-bg.jpg") top center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`
    
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: #FFF;
    ${mobile({ width: '75%' })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: #FFF;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled {
        background-color: rgba(0, 128, 128, 0.42);
        cursor: not-allowed;
    }
`

const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`

const ErrorText = styled.div`
    color: red;
    font-size: 12px;
    margin-bottom: 15px;
`

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector(state => state.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const changeRoute = () => {
        navigate('/register')
    }

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password})
    }

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="Username" onChange={ (e) => setUsername(e.target.value) } />
                    <Input type="password" placeholder="Password" onChange={ (e) => setPassword(e.target.value) } />
                    { error && <ErrorText> Something went wrong </ErrorText> }
                    <Button onClick={handleClick} disabled={isFetching}>{ isFetching ? "PLEASE WAIT..." : "LOGIN"}</Button>
                    <Link>FORGOT PASSWORD?</Link>
                    <Link onClick={() => changeRoute()}>CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login
