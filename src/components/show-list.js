import React, {useState, useEffect, useRef} from 'react';
import { RiDeleteBinFill } from 'react-icons/ri';
import styled from 'styled-components';
import ShowService from '../services/show-service';
import Popup from './popup';
import Show from './show';

function InitializeShows(showsSetter) {
    ShowService.getShows()
        .then((shows) => shows && showsSetter(shows))
        .catch((error) => {
            if (error.name === "SyntaxError" && typeof window !== "undefined") {
                const confirmed = window.confirm("Stored data is corrupted! \nWould you like to clear the list?");
                if (confirmed) {
                    showsSetter([]);
                }
            }
        });
}

const StyledShowList = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: start;
`;

const StyledShowAndDetails = styled.div`
    position: relative;
    width: 150px;
    height: 200px;
    margin-right: 20px;
`;

const StyledShowWrapper = styled.div`
    display: flex;
    width: 500px;
    height: 240px;
    position: relative;
    overflow: visible;
    z-index: 2;
    border-radius: 5px;
    background: rgba(44, 44, 44, 0.9);

    & .info {
        flex-grow: 2;
    }

    & .head {
        display: flex;
    }

    & .head h3 {
        flex-grow: 2;
    }
`;

const StyledBinIcon = styled(RiDeleteBinFill)`
    font-size: 1.6rem;
    color: #bbb;
    margin: 5px;
    cursor: pointer;

    &:hover {
        color: #fa5a5a;
    }
`;

function ShowWrapper({show, expandedShow}) {
    const ref = useRef(null);

    const onEscape = (e) => {
        if (e.keyCode === 27) {
            expandedShow.setExpandedShow(null);
        }
    }

    const onClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            expandedShow.setExpandedShow(null);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onEscape);
        document.addEventListener("click", onClick, true)
        document.addEventListener("touchend", onClick, true)

        return () => {
            document.removeEventListener("keydown", onEscape)
            document.removeEventListener("click", onClick, true)
            document.removeEventListener("touchend", onClick, true)
        }
    });

    const toggleExpand = (show) => {
        if (expandedShow.show === show){
            expandedShow.setExpandedShow(null);
        } else {
            expandedShow.setExpandedShow(show);
            // showRef.current.focus();
        }
    };

    const ShowElement = <Show show={show} onClick={() => toggleExpand(show)} />

    return expandedShow.show === show
        ? <StyledShowAndDetails>
            <StyledShowWrapper ref={ref}>
                {ShowElement}
                <div className="info">
                    <div className="head">
                        <h3>{show.title}</h3>
                        <StyledBinIcon onClick={show.delete} />
                    </div>
                    <p>{show.overview}</p>
                </div>
            </StyledShowWrapper>
        </StyledShowAndDetails>
        : ShowElement
}

export default function ShowList({style}) {

    const [shows, setShows] = useState([]);
    const [expandedShow, setExpandedShow] = useState(null)

    // initialize the show list from the show store.
    useEffect(() => {
        InitializeShows(setShows);
    }, [])

    useEffect(() => {
        ShowService.saveShows(shows).then();
    }, [shows]);

    let showElements = shows.map((show, i) => {
        show.delete = (event) => {
            const newShows = shows.filter((s, j) => j !== i);
            setShows(newShows);
            setExpandedShow(null);
        };

        return (<ShowWrapper
            key={i}
            show={show}
            expandedShow={{show: expandedShow, setExpandedShow}}
        />);
    });

    return <StyledShowList style={style}>
        <Popup shows={{shows, setShows}}/>
        {showElements}
    </StyledShowList>;
}
