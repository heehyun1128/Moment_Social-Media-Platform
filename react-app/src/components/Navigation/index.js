import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from './SearchBar';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul id='navigation-section'>
		<li id='search-bar'>
			<SearchBar />
		</li>
			<li>
				<NavLink exact to="/">Moment</NavLink>
			</li>
			{isLoaded && (
				<li id='profile-btn'>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;