import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [profilePic,setProfilePic] = useState(null);
	const [imageLoading, setImageLoading] = useState(false)
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();

		setImageLoading(true)
		if (password === confirmPassword) {

			formData.append('profile_image_url',profilePic)
			formData.append('username', username)
			formData.append('first_name', firstname)
			formData.append('last_name', lastname)
			formData.append('email', email)
			formData.append('password', password)
			console.log(Object.entries(formData))
			const data = await dispatch(signUp(formData));
			// const data = await dispatch(signUp(profilePic, username, firstname, lastname, email, password));
			if (data) {
				setErrors(data);
				console.log(data)
			} else {
				setImageLoading(false)
				closeModal();
			}
			
		} else {
			setErrors({
				passwordNotMatched:"Confirm Password field must be the same as the Password field"
			});
			console.log(errors)
		}
		console.log(errors)
	};

	return (
		<div id='signup-modal-div'>
			<h1>Sign Up</h1>
			<form id='signup-form' onSubmit={handleSubmit} encType="multipart/form-data">
			
				<label>
					<div>Profile Picture</div>
					<input
						type="file"
						accept="image/*"
						// value={profilePic}
						onChange={(e) => {
							console.log(e.target.files[0])
							setProfilePic(e.target.files[0])
						}}
			
					/>
					{(imageLoading) && <p>Loading...</p>}
				</label>
				<label>
					<div id="label"> <p >Email</p> <p id='required-field'>*</p></div>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				{errors && errors.email &&
					<p className="errors">{errors.email}</p>
				}
				<label>
				
					<div id="label"> <p >Username</p> <p id='required-field'>*</p></div>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				{errors   && errors.username &&
					<p className="errors">{errors.username}</p>
				}
				<label>
				
					<div id="label"> <p >First Name</p> <p id='required-field'>*</p></div>
					<input
						type="text"
						name="first_name"
						value={firstname}
						onChange={(e) => {
							setFirstname(e.target.value)
							console.log(e.target.value)
						}}
						required
					/>
				</label>
				{errors   && errors.first_name &&
					<p className="errors">{errors.first_name}</p>
				}
				<label>
					<div id="label"> <p >Last Name</p> <p id='required-field'>*</p></div>
					<input
						type="text"
						name="last_name"
						value={lastname}
						onChange={(e) => {
							setLastname(e.target.value)
						
						}}
						required
					/>
				</label>
				{errors  && errors.last_name &&
					<p className="errors">{errors.last_name}</p>
				}
				<label>
					<div id="label"> <p >Password</p> <p id='required-field'>*</p></div>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					<div id="label"> <p >Confirm Password</p> <p id='required-field'>*</p></div>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{errors   && errors.passwordNotMatched &&
					<p className="errors">{errors.passwordNotMatched}</p>
				}
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;