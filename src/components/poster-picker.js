import React from 'react';
import styled from 'styled-components';
import Show from '../components/show';

export default function PosterPicker({choices, onChange, style}) {
    return (
        <StyledPosterPicker style={style}>
            {choices.map((choice) => {
                return <Show key={choice.id} show={choice} readonly={true} onClick={() => onChange(choice)} />
            })}
        </StyledPosterPicker>
    );
}

const StyledPosterPicker = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;

    & img {
        width: 100x;
    }
`;
