import { Link } from "react-router-dom"
import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
    flex: 1;
    margin: 10px 15px;
    height: 70vh;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({ height: '20vh' })}
`
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`
const Title = styled.h1`
    color: #FFF;
    margin-bottom: 20px;
`
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: #FFF;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`

const CategoryItem = ({ category }) => {
    return (
        <Container>
            <Link to={`/products/${category.cat}`}>
                <Image src={ category.img } />
                <Info>
                    <Title>{ category.title }</Title>
                    <Button>SHOP NOW</Button>
                </Info>
            </Link>
        </Container>
    )
}

export default CategoryItem
