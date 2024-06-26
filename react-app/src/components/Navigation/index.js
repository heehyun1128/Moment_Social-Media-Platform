import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from './SearchBar';
import { useHistory } from 'react-router-dom';
import { useSearchContext } from '../../context/Search';
import logo from '../images/logo.JPG'
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import Tooltip from '@mui/material/Tooltip';


import { logout } from "../../store/session";


import SignupFormModal from "../SignupFormModal";
import './Navigation.css'
import { fetchUserProfileImage } from "../../store/user";
import PermitErrorModal from '../ErrorModal/PermitErrorModal';
import { useModal } from '../../context/Modal';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	const { searchContent, setSearchContent } = useSearchContext()

	const [showMenu, setShowMenu] = useState(false);
	const [isPermitError, setIsPermitError] = useState(false)
	const ulRef = useRef();
	const { setModalContent, setOnModalClose } = useModal()

	const handleViewAllPosts = () => {
		if (!sessionUser) {
			// alert('Please Sign Up or Log In to view your posts.')
			setModalContent(<PermitErrorModal />);
		}else{

		history.push(`/profile/${sessionUser.id}`)
		}

	}

	const handleGoToPostForm = e => {
		if (!sessionUser) {
			// alert('Please Sign Up or Log In to create a post.')
			setIsPermitError(true)
		}
		e.preventDefault()
		history.push('/posts/new')
	}

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef?.current?.contains(e.target)) {
				setShowMenu(false);
				
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);
	const closeMenu = () => setShowMenu(false);
	return (
		<div id='nav-container'>
			{isPermitError && <PermitErrorModal />}
			<div id='navigation-section'>
				<div id='search-bar'>
					<SearchBar
						searchContent={searchContent}
						setSearchContent={setSearchContent} />
				</div>
				<div id='title-div'>
					<NavLink exact to="/">MOMENT</NavLink>
				</div>
				<div id='nav-right-div'>
					{!sessionUser && <>
						<OpenModalButton
							id='login-btn'
							buttonText=" LOG IN"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>
						<OpenModalButton
							id='signup-btn'
							buttonText=" SIGN UP"
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
					</>}
					{sessionUser && isLoaded && (
						<div className='one' id='home-profile-btn'>
							<ProfileButton user={sessionUser} />
						</div>
					)}
					<div id="navigation-tab">
						<i class="fa-solid fa-layer-group"></i>
						<div id='icon-nav-div'>
							<ul id='icon-nav'>
								<li>
									<NavLink exact to='/posts/all'>
										<i class="fa-solid fa-house"></i>
										<span>VIEW ALL POSTS</span>
									</NavLink>
								</li>
								{/* <li>
								{isLoaded && (
									<div className='one' id='profile-btn'>
										<ProfileButton user={sessionUser} />
										<span>User</span>
									</div>
								)}
							</li> */}
								<li>
									{sessionUser &&<div onClick={handleGoToPostForm}>
										<i class="fa-solid fa-pen"></i>
										<span>CREATE A POST</span>
									</div>}
									{!sessionUser && <div>
										<OpenModalButton
											buttonText={<i class="fa-solid fa-pen fa-xl"></i>}

											modalComponent={<PermitErrorModal />}
										/>
										<span>CREATE A POST</span>
									</div>}
								</li>
								<li>
									{sessionUser && <div onClick={handleViewAllPosts}>
										<i class="fa-solid fa-book-open"></i>
										<span >MY PAGE</span>
									</div>}
									{!sessionUser && <div>
										<OpenModalButton
											buttonText={<i class="fa-solid fa-book-open fa-xl"></i>}

											modalComponent={<PermitErrorModal />}
										/>
										<span>MY PAGE</span>
									</div>}
								</li>
								{/* <li>
									<div onClick={handleUserSettings}>
										<i class="fa-solid fa-gears"></i>
										<span >SETTINGS</span>
									</div>
								</li> */}
							</ul>
						</div>
					</div>
					
				</div>
			</div>
			<div id='search-bar-hidden'>
				<SearchBar
					searchContent={searchContent}
					setSearchContent={setSearchContent} />
			</div>
		</div>
	);
}

export default Navigation;