import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Navbar from '../components/navbar';

const Container = styled.div`
    display: flex;
    felx-direction: row;
    height: 100vh;
`;

export default function Home() {

    return <Container>
       <Helmet>
            <meta charSet="utf-8" />
            <title>MyMovieList</title>
        </Helmet>
        <Navbar/>
    </Container>
}