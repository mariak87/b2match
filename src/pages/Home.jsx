import { useEffect, useState } from "react";
import React from 'react';
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";


function Home() {
    const [food, setFood] = useState([]);

    const getFood = async () => {
        const check = localStorage.getItem('food');

        if (check) {
            setFood(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
            const data = await api.json();
            localStorage.setItem('food', JSON.stringify(data.recipes));
            setFood(data.recipes);
        }

    }

    useEffect(() => {
        getFood();
    }, []);


    return (
        <div>
            <Container>
                <Title>Popular Recipes</Title>
            </Container>

            <Splide options={{
                    perPage: 3,
                    drag: "free",
                    gap: "5rem",

                }}>
                    {food.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={'/recipe/' + recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title} />
                                    </Link>
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            
        </div>
    )
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
    align-items: center; 
`;

const Title = styled.h3`
    text-align: center; 
    font-family: cursive;
`;

const Card = styled.div`
    text-decoration: none;
    min-height: 20rem;
    min-width: 20rem;
    position: relative;
    margin: 1rem;

    img{
        border-radius: 2rem;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p{
        text-align: center;
        font-weight: 600;
        padding: 1rem 0rem;
    }
`;


export default Home