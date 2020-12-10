import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Navbar from '../components/navbar';
import ShowList from '../components/show-list';

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
        <ShowList style={{marginLeft: "40px"}} />
    </Container>
}