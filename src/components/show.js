import React from 'react';
import styled from 'styled-components';

export default function Show({show, onClick, readonly}) {

    return (
        <StyledShow onClick={onClick} >
            <Poster show={show}>
                <div className="overlay">
                    <h4 className="name">{ show.title }</h4>
                </div>
            </Poster>
        </StyledShow>
    );
}

const Poster = styled.div`
    position: relative;
    border-radius: 2px;
    width: 150px;
    height: 225px;
    background-image: url(${({show}) => show.poster});
    background-size: contain;
    background-repeat: no-repeat;

    & .overlay {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }

    & .overlay:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

const StyledShow = styled.div`
    display: flex;
    padding: 10px;
    cursor: pointer;

    & img {
        width: 150px;
        height: 200px;
    }

    & a {
        color: #fff;
        text-decoration: none;
    }

    &:hover .edit-btn {
        display: inline;
    }

    & .name {
        margin: 5px;
    }
`;
