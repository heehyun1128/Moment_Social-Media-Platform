import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from './SearchBar';
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()



	const handleViewAllPosts = () => {
		if (!sessionUser) {
			alert('Please Sign Up or Log In to view your comments.')
		}else{

		history.push(`/profile/${sessionUser.id}`)
		}

	}

	const handleGoToPostForm = e => {
		if (!sessionUser) {
			alert('Please Sign Up or Log In to create a post.')
		}
		e.preventDefault()
		history.push('/posts/new')
	}
	return (
		<div id='navigation-section'>
			<div id='search-bar'>
				<SearchBar />
			</div>
			<div id='title-div'>
				<NavLink  exact to="/">Moment</NavLink>
			</div>
			<div id='nav-right-div'>
				{/* <div className='one' onClick={handleGoToPostForm}>
					<i class="fa-solid fa-pen"></i>
				</div> */}
				{isLoaded && (
					<div className='one' id='profile-btn'>
						<ProfileButton user={sessionUser} />
					</div>
				)}
				<div id="navigation-tab">
					<i class="fa-solid fa-layer-group"></i>
					<div id='icon-nav-div'>
						<ul id='icon-nav'>
							<li>
								<NavLink exact to='/'>
									<i class="fa-solid fa-house"></i>
									<span>Home</span>
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
								<div onClick={handleGoToPostForm}>
									<i class="fa-solid fa-pen"></i>
									<span>Create a Post</span>
								</div>
							</li>
							<li>
								<div onClick={handleViewAllPosts}>
									<i class="fa-solid fa-book-open"></i>
									<span >View My Posts</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navigation;