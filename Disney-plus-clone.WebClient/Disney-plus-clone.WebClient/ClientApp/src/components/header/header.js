import React, {useEffect} from 'react';
import styled from "styled-components";
import {
    selectUserName,
    selectUserEmail,
    selectUserPhoto,
    setUserLoginDetails,
    setSignOutState
} from "../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {auth, provider} from "../../firebase";

const Header = (props) => {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
    
    useEffect(()=> {
        auth.onAuthStateChanged(async (user)=> {
            if (user) {
                setUser(user);
                history.push("/home")
            }
        })
    }, [userName]); 
    
    /*
    [userName] known as dependency- so the above hook will only fire
    once the userName dependency changes
     */
    
    const handleAuth = () => {
        /*
        when user not signed in- do the below
        */
        if (!userName) {
            auth
                .signInWithPopup(provider)
                
                .then((result) => {
                    setUser(result.user)
                }).catch((error) => {
                alert(error.message)
            });
            /*
            when user IS signed in.. allow to sign out
            */
        } else if (userName) {
            auth.signOut().then(() => {
                dispatch(setSignOutState())
                history.push('/')
            }).catch((error) => alert(error.message))
        }
    }
    
    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        }))
    }
    return (
        <>
            <Nav>
                <Logo>
                    <img src="/images/logo.svg" alt='disney logo'/>
                </Logo>
                {/*
                    THE BELOW- if there is no user or user not logged in show the "Login" button, ELSE, 
                    if there is a user or user logged in show the next lot 
                */}
                {!userName ? 
                    <Login onClick={handleAuth}>Login</Login> : 
                    <>
                        <NavMenu>
                            <a href='/home'>
                                <img src='/images/home-icon.svg' alt='Home Icon'/>
                                <span>HOME</span>
                            </a>
                            <a>
                                <img src='/images/search-icon.svg' alt='Search Icon'/>
                                <span>SEARCH</span>
                            </a>
                            <a>
                                <img src='/images/watchlist-icon.svg' alt='Watchlist Icon'/>
                                <span>WATCHLIST</span>
                            </a>
                            <a>
                                <img src='/images/original-icon.svg' alt='Original Icon'/>
                                <span>ORIGINALS</span>
                            </a>
                            <a>
                                <img src='/images/movie-icon.svg' alt='Movies Icon'/>
                                <span>MOVIES</span>
                            </a>
                            <a>
                                <img src='/images/series-icon.svg' alt='Series Icon'/>
                                <span>SERIES</span>
                            </a>
                        </NavMenu>
                        <SignOut>
                            <UserImg src={userPhoto} alt={userName}/>
                            <DropDown>
                                <span onClick={handleAuth}>Sign out</span>
                            </DropDown>
                        </SignOut>
                        
                    </>
                    }
            </Nav>
        </>
    );
}

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
    
    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
    }
`;

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0
    display: inline-block;
    
    img {
        display: block;
        width: 100%;
    }
`;

const NavMenu = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
    position: relative;
    margin-right: auto;
    margin-left: 25px;
    
    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        text-decoration: none;
        
        img {
            height: 20px;
            min-width: 20px;
            width: 20px;
            z-index: auto;
        }
        
        span {
            color: rgb(249,249,249);
            font-size: 13px;
            letter-spacing: 1.42px;
            line-height: 1.08px;
            padding: 2px 0;
            white-space: nowrap;
            position: relative;
            
        &:before {
            background-color: rgb(249,249,249);
            border-radius: 0 0 4px 4px;
            content: "";
            height: 2px;
            left: 0;
            right: 0;
            bottom: -6px;
            opacity: 0;
            position: absolute;
            transform-origin: left center;
            transform: scaleX(0);
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            visibility: hidden;
            width: auto;
            }
        }
        
        &:hover {
            span: before {
                transform: scaleX(1);
                visibility: visible;
                opacity: 1 !important;
             }
        }
    }
    
    @media (max-width: 768px) {
    display: none;
    }
`;

const Login = styled.a`
    background-color: rba(0,0,0,0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;
    
    &:hover {
        border-color: transparent;
        background-color: #f9f9f9;
        color: #000 !important;
        cursor: pointer;
    }
`;

const UserImg = styled.img`
    height: 100%;
`;

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0;
    background-color: rgb(19,19,19);
    border: 1px solid rgba(151,151,151,034);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0 0 18px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
`;

const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 8px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    
    ${UserImg} {
        border-radius: 50%;
    }
    
    &:hover {
        ${DropDown} {
            opacity: 1;
            transition-duration: 1s;
        }
    }
`;

export default Header;