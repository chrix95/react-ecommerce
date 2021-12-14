import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { Add, Remove } from '@material-ui/icons'
import { mobile } from '../responsive'
import { useLocation } from 'react-router-dom'
import { publicRequest } from '../functions/axiosInstance'
import { capitalize, currency } from '../functions'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/reducers/cartReducer'

const Container = styled.div`
`

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: 'column' })}
`

const ImgContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    width: 100%;
    height: 80vh;
    object-fit: cover;
    ${mobile({ height: '40vh' })}
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
    font-weight: 200;
`
const Description = styled.p`
    margin: 20px auto;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const FilterContainer = styled.div`
    width: 70%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: '100%' })}
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`

const FilterSizeOption = styled.option`
`

const AddContainer = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: '100%' })}
`

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto 5px;
`

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: #FFF;
    cursor: pointer;
    font-weight: 500;
    &:hover {
        background-color: #f8f4f4;
    }
`

const Product = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const productId = location.pathname.split('/')[2]
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState(null)
    const [size, setSize] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`/products/find/${productId}`)
                setProduct(res.data.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProduct()
    }, [productId])

    const handleQuantityChange = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const handleClick = () => {
        // update cart
        dispatch(addProduct({ ...product, quantity, color, size }));
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Description>{product.description}</Description>
                    <Price>$ {product.price && currency(product.price)}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color:</FilterTitle>
                            {product?.color?.map(c => (
                                <FilterColor key={c} color={c} onClick={() => setColor(c)} className={color === c && "activeColor"} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size:</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                <FilterSizeOption value={null}>Select a size</FilterSizeOption>
                                {product?.size?.map(s => (
                                    <FilterSizeOption key={s}>{capitalize(s)}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantityChange("dec")}/>
                            <Amount>{ quantity }</Amount>
                            <Add onClick={() => handleQuantityChange("inc")}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product
