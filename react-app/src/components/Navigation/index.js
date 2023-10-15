import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from './SearchBar';
import { useHistory } from 'react-router-dom';
import { useSearchContext } from '../../context/Search';
import logo from '../images/logo.JPG'


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	const { searchContent, setSearchContent } = useSearchContext()

	const handleViewAllPosts = () => {
		if (!sessionUser) {
			alert('Please Sign Up or Log In to view your posts.')
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
		<div id='nav-container'>
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
									<div onClick={handleGoToPostForm}>
										<i class="fa-solid fa-pen"></i>
										<span>CREATE A POST</span>
									</div>
								</li>
								<li>
									<div onClick={handleViewAllPosts}>
										<i class="fa-solid fa-book-open"></i>
										<span >MY POSTS</span>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navigation;