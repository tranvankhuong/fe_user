import React from "react";
import {useForm} from 'react-hook-form'
import { useHistory,NavLink } from 'react-router-dom';
import {registerAccount} from '../../services/auth.service';
import Swal from "sweetalert2";
function Register(){
    const history = useHistory();
    const { register,formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async  function (user) {
		console.log(user);
        try{
            const res = await registerAccount(user);
            console.log(res.data);  
            if(res.status === 200){
                Swal.fire({
                    title: "Signup failed",
                    icon: "error",
                    text: `${res.data.message}`,
                    confirmButtonText: "OK",
                });
            }
            if(res.status  === 201){
                Swal.fire({
                    title: "Sign up success. Verify your account!",
                    showCancelButton: true,
                    confirmButtonText: `OK`
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        localStorage.usernameVerify = user.username;  
                        history.push('/verify');
                    } 
                })
            }
        }
        catch(err){
            console.log(err);
        }
    }    
    return (
        
        <div className="login-page-content">
			<div className="sign-up-content-page">
				<div className="container custom-max-width-container">
					<div className="row">
						<div className="col-12 col-sm-12 col-md-12 wow fadeInUp column-top-login">
							<div className="main-box-top-title">
								<h1 className="title-main-page font-48 text-center">
									Sign up
								</h1>
								<div className="description-main-page text-center font-18">
									Use your work email to create new account
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-sm-12 col-md-12 wow fadeInUp column-top-login form-bistkey">
							<div className="form-subscribe float-none margin-top-50">
							<form onSubmit={handleSubmit(onSubmit)}>
									<div className="form-group">
										<label htmlFor="inputRegisterForm-username">Username</label>
										<input type="text" className="form-control" id="inputRegisterForm-username" placeholder="abc1245"{...register("username",{maxLength:16})}required></input>
										{errors.username && "Max length 16"}
									</div>
									<div className="form-group">
										<label htmlFor="inputRegisterForm-username">Full Name</label>
										<input type="text" className="form-control" id="inputRegisterForm-fullname" placeholder="Nguyen Van ABC" {...register("fullname")} required></input>
									</div>
									<div className="form-group">
										<label htmlFor="inputRegisterForm-username">First Name</label>
										<input type="text" className="form-control" id="inputRegisterForm-firstname" placeholder="Nguyen" {...register("firstname")} required></input>
									</div>
									<div className="form-group">
										<label htmlFor="inputRegisterForm-lastname">Last Name</label>
										<input type="text" className="form-control" id="inputRegisterForm-lastname" placeholder="ABC" {...register("lastname")} required></input>
									</div>
									<div className="form-group">
										<label htmlFor="inputRegisterForm-email">EMAIL</label>
										<input type="email" className="form-control" id="inputRegisterForm-email" placeholder="you@example.com" {...register("email")} required></input>
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputPassword1">PASSWORD</label>
										<input type="password" className="form-control" id="inputRegisterForm-password" placeholder="************" {...register("password",{minLength:4,maxLength:16})} required></input>
										{errors.password && "Min length:4, Max length 20"}
									</div>
									
									<div className="custom-control custom-checkbox">
										<input type="checkbox" className="custom-control-input" id="defaultChecked" required></input>
										<label className="custom-control-label" htmlFor="defaultChecked" >I have read the <NavLink to="/terms">Terms and Conditions.</NavLink></label>
									</div>
									<div className="login-submit margin-top-15">
										<button className="btn sub-login full-width-btn">Register </button>
									</div>
										<div className="login-facebook margin-top-35">
										<p className="social-fb">Have an account? <NavLink to="/login">Login now!</NavLink></p>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
    )
}
export default Register;