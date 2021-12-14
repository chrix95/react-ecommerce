import React from 'react'
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/apiCalls'

const Container = styled.div`
    height: 60px;
    position: sticky;
    top: 0;
    z-index: 3;
    background-color: #FFF;
    transition: all 0.5s ease-in-out;
    ${mobile({ height: '50px' })}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({ padding: '10px' })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-size: 14;
    cursor: pointer;
    ${mobile({ display: 'none' })}
`

const SearchContainer = styled.span`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
    border: none;
    ${mobile({ width: '50px' })}
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: '24px' })};
    cursor: pointer;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: 'center' })}
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`

const Navbar = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const { quantity } = useSelector(state => state.cart)

    const changeRoute = (location) => {
        navigate(`/${location}`)
    }

    const handleLogout = (e) => {
        e.preventDefault();
        logout(dispatch);
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <Search style={{ color: "gray", fontSize: 16 }}/>
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo onClick={() => changeRoute('')}>LAMA.</Logo>
                </Center>
                <Right>
                    {
                        currentUser ? (
                            <>
                                <MenuItem onClick={(e) => e.preventDefault()}>DASHBOARD</MenuItem>
                                <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
                            </>
                        ) : (    
                            <>
                                <MenuItem onClick={() => changeRoute('register')}>REGISTER</MenuItem>
                                <MenuItem onClick={() => changeRoute('login')}>SIGN IN</MenuItem>
                            </>
                        )
                    }
                    <MenuItem onClick={() => changeRoute('cart')}>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
