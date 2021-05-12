import React, {} from 'react';
import styled from "styled-components";

const Detail = (props) => {
    return (
        <>
            <Container>
                <Background>
                    <img src='https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/D53D1F5D357587A8D09067AB09FFC7096F837CBAAE02BDC3C0E75814471A1E36/scale?width=1440&aspectRatio=1.78&format=jpeg'
                         alt='img'/>
                </Background>
            </Container>
        </>
    );
}

const Container = styled.div`
    position: relative;
    min-height: calc(100vh-250px);
    overflow-x: hidden;
    display: block;
    top: 72px;
    padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
    left: 0;
    opacity: 0.8;
    position: fixed;
    right: 0;
    top: 0;
    z-index: -1;
    
    img {
        width: 100vw;
        height: 100vh;
        
        @media (max-width: 768px) {
            width: initial;
        }
    }
    
`;
export default Detail;