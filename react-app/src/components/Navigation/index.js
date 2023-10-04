import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from './SearchBar';
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history=useHistory()
	const handleGoToPostForm = e=>{
		e.preventDefault()
		history.push('/posts/new')
	}
	return (
		<div id='navigation-section'>
		<div id='search-bar'>
			<SearchBar />
		</div>
			<div>
				<NavLink exact to="/">Moment</NavLink>
			</div>
			<div id='nav-right-div'>
				<div id='one' onClick={handleGoToPostForm}>
					<i class="fa-solid fa-pen"></i>
				</div>
				{isLoaded && (
					<div id='profile-btn'>
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Navigation;