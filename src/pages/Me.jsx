import React from 'react';
import styled from "styled-components";


function Me() {
    return (
        <div>
            <Container>
                <Title>Maria Katić</Title>
            </Container>

            <div>
                I am a Computer Science student at Faculty of Electrical Engineering and Computing in Zagreb.
                I am from Split, but I moved to Zagreb to study. 
                During my academic journey I was interested in application development and data science. 
                I participated in Erasmus+ exchange program at Universidade de Aveiro in Portugal. 
                In my free time I like to play volleyball, read and cook. 
                I made a simple culinary web application for anyone who has a passion for cooking or is just learning to cook.
                I hope you like it! 😊
                
            </div>
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

export default Me