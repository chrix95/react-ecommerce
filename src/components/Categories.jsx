import styled from "styled-components"
import { categories } from '../data'
import CategoryItem from "./CategoryItem"
import { mobile } from '../responsive'

const Container = styled.div`
    padding: 20px;
`
    
const CategoryList = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    ${mobile({ padding: '0px', flexDirection: 'column' })}
`

const Title = styled.h2`
    font-size: 40px;
    font-weight: 100;
    text-align: center;
    margin-bottom: 30px;
    ${mobile({ fontSize: '24px', marginBottom: '10px', fontWeight: 300 })}
`

const Categories = () => {
    return (
        <Container>
            <Title>CATEGORY</Title>
            <CategoryList>
                {
                    categories.map(category => (
                        <CategoryItem category={category} key={category.id} />
                    ))
                }
            </CategoryList>
        </Container>
    )
}

export default Categories
