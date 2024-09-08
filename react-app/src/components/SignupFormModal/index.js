import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [profilePic, setProfilePic] = useState(null);
	const [imageLoading, setImageLoading] = useState(false)
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();
	const [selImage, setSelImage] = useState(null)


	const displayFile = e => {
	
		e.stopPropagation()
		const image = e.target.files[0]
		const imageUrl = URL.createObjectURL(image)
		setSelImage(imageUrl)
	}

	const handleDeselectImg = e => {
		e.preventDefault()
		setSelImage(null)
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();

		setImageLoading(true)
		if (password === confirmPassword) {
			if (profilePic) {

				formData.append('profile_image_url', profilePic)
			}
			formData.append('username', username)
			formData.append('first_name', firstname)
			formData.append('last_name', lastname)
			formData.append('email', email)
			formData.append('password', password)
		
			const data = await dispatch(signUp(formData));
			
			if (data) {
				setErrors(data);
				
			} else {
				setImageLoading(false)
				closeModal();
			}

		} else {
			setErrors({
				passwordNotMatched: "Confirm Password field must be the same as the Password field"
			});
			
		}
	
	};

	return (
		<div id='signup-modal-div'>
			<h1>SIGN UP</h1>
			<form id='signup-form' onSubmit={handleSubmit} encType="multipart/form-data">

				<label id='signup-input-label'>
					<div>Profile Picture (optional)</div>
					<input
					id='select-profile-pic'
						type="file"
						accept="image/*"
						
						onChange={(e) => {
							
							setProfilePic(e.target.files[0])
							displayFile(e)
						}}

					/>
					<i class="fa-solid fa-image fa-lg"></i>
					<div id='image-preview-box'>
						{selImage && <img src={selImage} id='profile-img-preview' alt='' />}
						{/* {selImage && <div id='deslect-image-btn' onClick={handleDeselectImg}>Deslect Image</div>} */}
					</div>
				</label>
				{/* {(imageLoading) && <p>Loading...</p>} */}
				<label>
					<div className="label"> <p >Email</p> <p id='required-field'>*</p></div>
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

					<div className="label"> <p >Username</p> <p id='required-field'>*</p></div>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				{errors && errors.username &&
					<p className="errors">{errors.username}</p>
				}
				<label>

					<div className="label"> <p >First Name</p> <p id='required-field'>*</p></div>
					<input
						type="text"
						name="first_name"
						value={firstname}
						onChange={(e) => {
							setFirstname(e.target.value)
						
						}}
						required
					/>
				</label>
				{errors && errors.first_name &&
					<p className="errors">{errors.first_name}</p>
				}
				<label>
					<div className="label"> <p >Last Name</p> <p id='required-field'>*</p></div>
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
				{errors && errors.last_name &&
					<p className="errors">{errors.last_name}</p>
				}
				<label>
					<div className="label"> <p >Password</p> <p id='required-field'>*</p></div>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors && errors.password && <p className="errors">{errors.password}</p>}
				<label>
					<div className="label"> <p >Confirm Password</p> <p id='required-field'>*</p></div>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{errors && errors.passwordNotMatched &&
					<p className="errors">{errors.passwordNotMatched}</p>
				}
				<button id='signup-btn' type="submit">SIGN UP</button>
			</form>
		</div>
	);
}

export default SignupFormModal;