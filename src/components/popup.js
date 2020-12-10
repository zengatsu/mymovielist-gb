import React, {useEffect, useRef, useState} from 'react';
import DatePicker from "react-datepicker";
import { RiCloseLine } from 'react-icons/ri';
import styled from 'styled-components';
import {debounce, throttle} from 'lodash';

import "react-datepicker/dist/react-datepicker.css";
import apiService from '../services/api-service';
import PosterPicker from '../components/poster-picker';

const Head = styled.div`
    display: flex;
    align-items: center;
`;

const PopupContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0,0,0, 0.5);
    z-index: 99;
`;

const PopupInner = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 15%;
    left: 50%;
    width: 80%;
    max-width: 800px;
    padding: 10;
    transform: translate(-50%, 0);

    & input[name=name]{
        width: 100%;
        background: rgba(3, 3, 3, 0.3);
        height: 50px;
        border: 2px solid #585757;
        border-radius: 12px;
        font-size: 1.5em;
        color: white;
        padding: 0px 20px;
        box-sizing: border-box;
    }

    & .react-datepicker__input-container input {
        border: 0;
        padding: 5px;
        border-radius: 7px;
        text-align: center;
        margin: 10px 0;
    }
`;

const CloseButton = styled(RiCloseLine)`
    font-size: 40px;
    cursor: pointer;
`;

const AddShow = styled.a`
    width: 150px;
    height: 225px;
    padding: 10px;
    display: flex;
    cursor: pointer;

    & svg {
        stroke: #373734;

    }

    &:hover svg {
        stroke: #5595ff;
    }
`;


const AddButton = styled.button`
    background-color: #5595ff;
    width: 100%;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    border-radius: 7px;
    border: none;
    color: #fff;
`;

const Badge = styled.span`
    background-color: #607aa5;
    padding: 1px;
    border-radius: 3px;
    margin-left: 11px;
`;

function SearchInput({callback, show}) {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [inputRef]);

    const throttledOnChange = debounce( (value) => {
        apiService.findMovies(value).then(callback);
    }, 1000);

    const onChanged = (event) => {
        event.persist();
        const value = event.target.value;
        if (value.length > 2) {
            throttledOnChange(value);
        }
    }

    return <input ref={inputRef} tabIndex="-1" style={{ flexGrow: 2 }} type="text" name="name" onChange={onChanged}/>
}

const StyledShowDetails = styled.div`
    flex-grow: 2;
    background: rgba(0,0,0,0.6);
    border-radius: 8px;
    padding: 10px 20px;
    flex-direction: row;
    display: flex;
`;

function ShowDetails({show, shows}) {
    const [watchDate, setWatchDate] = useState(new Date());

    return <StyledShowDetails>
        <img width="150" height="225" src={show ? show.poster : ""} style={{ backgroundColor: "#555" }} alt="Poster" />
        <div style={{ flexGrow: 2, padding: "0px 10px", }}>
            <h2>{show.title}
                <Badge>{String((new Date(show.releaseDate)).getFullYear())}</Badge>
            </h2>
            <p>{show.overview}</p>
        </div>
        <div style={{
            display: "flex",
            padding: "10px 10px 0",
            flexDirection: "column",
        }}>
            <label htmlFor="watchedOn">Watched on</label>
            <DatePicker id="watchedOn" selected={watchDate} onChange={(date) => setWatchDate(date)} />
            <AddButton role="button" onClick={((show) => {
                shows.setShows([show].concat(shows.shows));
            }).bind(this, show)}>Add</AddButton>
        </div>
    </StyledShowDetails>
}

export default function Popup({shows}) {
    // const [airDate, setAirDate] = useState(new Date());
    const [showPopup, setShowPopup] = useState(false);
    const [show, setShow] = useState({});
    // TODO initialize with most popular or random...
    const [posterChoices, setPosterChoices] = useState([]);

    const ref = useRef(null);

    const onEscape = (e) => {
        if (e.keyCode === 27) {
            setShowPopup(false)
        }
    }

    const onClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setShowPopup(false)
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onEscape);
        document.addEventListener("click", onClick, true)
        document.addEventListener("touchend", onClick, true)

        // TODO Cache this
        apiService.getSuggestions("en-US", "popularity.desc").then((posters) => {
            setPosterChoices(posters);
        });

        return () => {
            document.removeEventListener("keydown", onEscape)
            document.removeEventListener("click", onClick, true)
            document.removeEventListener("touchend", onClick, true)
        }
    }, []);

    const togglePopup = () => setShowPopup(!showPopup)

    function onPickedShowChanged(pShow) {
        setShow(pShow);
        setShowPicked(true);
        console.log(show);
    }

    const [showPicked, setShowPicked] = useState(false);

    const Modal = <PopupContainer>
        <PopupInner ref={ref}>
            <Head>
                <SearchInput key="1" callback={setPosterChoices} show={show}/>
                <CloseButton onClick={togglePopup} role="button" />
            </Head>
            { showPicked ? <ShowDetails show={show} shows={shows} /> : null}
            <div style={{position: "relative", }}>
                <PosterPicker choices={posterChoices} onChange={onPickedShowChanged} />
            </div>
        </PopupInner>
    </PopupContainer>


    return <div>
        <AddShow key="-1" onClick={() => setShowPopup(!showPopup)}>
            <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" strokeWidth="7.5"></circle>
                <line x1="32.5" y1="50" x2="67.5" y2="50" strokeWidth="5"></line>
                <line x1="50" y1="32.5" x2="50" y2="67.5" strokeWidth="5"></line>
            </svg>
        </AddShow>
        {showPopup ? Modal : null}
    </div>
}