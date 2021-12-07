import styled from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product"
import { mobile } from '../responsive'

const Container = styled.div`
    padding: 20px;
    margin-top: 20px;
    ${mobile({ marginTop: '5px' })}
`

const ProductList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Title = styled.h2`
    font-size: 40px;
    font-weight: 100;
    text-align: center;
    margin-bottom: 30px;
    ${mobile({ fontSize: '24px', marginBottom: '10px', fontWeight: 300 })}
`

const Products = () => {
    return (
        <Container>
            <Title>PRODUCTS</Title>
            <ProductList>
                {
                    popularProducts.map(product => (
                        <Product key={product.id} product={product} />
                    ))
                }
            </ProductList>
        </Container>
    )
}

export default Products
