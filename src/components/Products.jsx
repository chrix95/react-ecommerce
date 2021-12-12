import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Product from "./Product";
import { mobile } from '../responsive';
import axios from 'axios';

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

const Products = ({ category, filters, sort }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (category) {
            window.scrollTo(0, 0);
        }
        // get products from our API
        const getProducts = async () => {
            try {
                const url = category ? `http://localhost:5000/api/products?category=${category}` : `http://localhost:5000/api/products`;
                const res = await axios.get(url);
                setProducts(res.data.data);
            } catch (err) {
                console.log("Error fetching products");
                console.log(err);
            }
        }
        getProducts();
    }, [category])

    useEffect(() => {
        category && setFilteredProducts(
            products.filter(
                product => Object.entries(filters).every(
                    ([key, value]) => product[key].includes(value)
                )
            )
        );
    }, [products, category, filters])

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => new Date(a.createdAt) < new Date(b.createdAt))
            );
        } else if (sort === "asc") {
            setFilteredProducts((prev) => 
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) => 
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort])

    return (
        <Container>
            <Title>PRODUCTS</Title>
            <ProductList>
                {
                    category ?
                    filteredProducts.map(product => (
                        <Product key={product._id} product={product} />
                    )) : products.slice(0, 8).map(product => (
                        <Product key={product._id} product={product} />
                    ))
                }
            </ProductList>
        </Container>
    )
}

export default Products
