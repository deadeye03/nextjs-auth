"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { useSession, signIn } from "next-auth/react"
import { useState, useRef, useEffect } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"
import { createAccount } from "@/action/userAction"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";


const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.push('/')
  }

  const handleError = (error) => {
    if (error.code === 11000) {
      toast('Email already Exists')
    }
    if (error.name === 'ValidationError') {
      
      error.message.split(':')[2] ? toast(error.message.split(':')[2]) : toast(error.message)
      toast(error.message.split(':')[2])
    }
  }
  //FORM HANDLER FORM1 FOR SIGN UP
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  //2) Form2 is Sign in
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 }
  } = useForm()
  //HANDLE SIGNUP

  const onSignUp = async (data) => {
    if (data.password !== data.passwordConfirm) {
      toast('Password not match..')
      return;
    }
    const res = await createAccount(await data)
    if (res.status === 'success') {
      toast('Account is Created...');
      router.push('/login', { replace: true });
      return;
    }
    console.log(res.error)
    handleError(res.error)

  }
  //On Singin handle
  const onSignin = async (data) => {
    toast('Logging in.....')
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (res.error) {
      
    };
    if (!res.error) {
    
      return router.push("/")
    };
  }

  const [isSignup, setSignup] = useState(true)
  const loginBgcRef = useRef(null)
  const signBtnRef = useRef(null)
  const messageRef = useRef(null)
  const headRef = useRef(null)
  const loginRef = useRef(null)
  const signUpRef = useRef(null)
  const loginButtonRef = useRef(null)
  const signupButtonRef = useRef(null)
  const handleSignIn = async (credential) => {
   
    try {
      toast('Please Wait...');
      const res = await signIn(credential, { callbackUrl: '/' });
      

    } catch (error) {
      toast.error('Login failed',error);
    }
  };

  function handleChange() {
    setSignup(() => !isSignup)
    if (isSignup) {

      loginBgcRef.current.style.left = '0%';
      loginBgcRef.current.style.borderTopLeftRadius = '20px';
      loginBgcRef.current.style.borderBottomLeftRadius = '20px';
      loginBgcRef.current.style.borderTopRightRadius = '0';
      loginBgcRef.current.style.borderBottomRightRadius = '0';
      signBtnRef.current.textContent = 'Sign in';
      headRef.current.textContent = 'Welcome Back !'
      messageRef.current.textContent = 'To keep connected with us please login with your personal info';
    }
    else {
     
      loginBgcRef.current.style.left = '50%';
      loginBgcRef.current.style.borderTopLeftRadius = '0';
      loginBgcRef.current.style.borderBottomLeftRadius = '0';
      loginBgcRef.current.style.borderTopRightRadius = '20px';
      loginBgcRef.current.style.borderBottomRightRadius = '20px';
      signBtnRef.current.textContent = 'Sign up';
      headRef.current.textContent = 'Hello , Friend!'
      messageRef.current.textContent = 'Enter your personal details and  start journey with us';
    }
  }
  const openSignUp = () => {
    loginRef.current.style.bottom = '60vh'
    signUpRef.current.style.top = '12vh'
    signupButtonRef.current.style.backgroundColor = 'black'
    signupButtonRef.current.style.color = 'white'
    loginButtonRef.current.style.backgroundColor = 'white'
    loginButtonRef.current.style.color = 'black'
  }
  const openLogin = () => {
    loginRef.current.style.bottom = '15vh'
    signUpRef.current.style.top = '60vh'
    signupButtonRef.current.style.backgroundColor = 'white'
    signupButtonRef.current.style.color = 'black'
    loginButtonRef.current.style.backgroundColor = 'black'
    loginButtonRef.current.style.color = 'white'
  }
  return <>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      limit={1}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" />
    <ToastContainer />

    <section className="login ">
      <div className="login__box ">
        <div className="signin sign__box">
          <h1 className="head-secondary head-pirmary">Sign in</h1>

          {/* SIGN METHOD */}

          <ul className="signin__method">
            <li>
              <button onClick={() => handleSignIn("github")} className="login__option">
                <FaGithub className="h-8 w-8"/>
              </button>
            </li>
            <li>
              <button className="login__option" onClick={() => handleSignIn("google")}>
              <FcGoogle className="h-8 w-8"/>
              </button>
            </li>
           
          </ul>
          <p>or use your account</p>

          {/* via Credential */}

          <form className="signin__form" onSubmit={handleSubmit2(onSignin)}>
            <input type="email" {...register2("email", { required: { value: true, message: 'Enter a Email id ' } })} placeholder="Enter email id " />
            {errors2.email && <div className='text-red-800'>{errors2.email.message}</div>}

            <input type="password" {...register2("password", { required: { value: true, message: 'please enter password' } })} placeholder="Enter password" />
            {errors2.password && <div className='text-red-800'>{errors2.password.message}</div>}

            <a href="#" className="forgot__passwrord">
              Forgot your password<span>?</span>
            </a>
            <button type="submit" className="sign__btn submit__btn">Sign in</button>
          </form>
        </div>
        <div className="signup sign__box ">
          <h1 className="head-secondary head-pirmary">Create Account</h1>

          <form className="signin__form" onSubmit={handleSubmit(onSignUp)}>
            <input type="text" {...register("name", { required: { value: true, message: 'Please enter your full name' } })} placeholder="Full Name" />
            {errors.name && <div className='text-red-800'>{errors.name.message}</div>}
            <input type="email" {...register("email", { required: { value: true, message: 'Enter a Email id ' } })} placeholder="Enter email id " />
            {errors.email && <div className='text-red-800'>{errors.email.message}</div>}
            
            <input type="password" {...register("password", { required: { value: true, message: 'please enter password' }, minLength: { value: 8, message: 'password should 8 charachter' }, maxLength: { value: 16, message: 'password should only 8-16 character' } })} placeholder="Enter password" />
            {errors.password && <div className='text-red-800'>{errors.password.message}</div>}
            <input type="password" {...register("passwordConfirm", { required: true })} placeholder="Confirm password" minLength="8" />
            <button type="submit" className="sign__btn submit__btn">Sign up</button>
          </form>
        </div>
        <div className="login__bgc" ref={loginBgcRef}>
          <div className="user__meassage" >
            <h1 className="head-pirmary" ref={headRef}>Hello, Friend!</h1>
            <h4 className="message px-32" ref={messageRef} >Enter your personal details and start<br /> journey with us</h4>
          </div>
          <button onClick={handleChange} className="sign__btn" id="sign__btn" ref={signBtnRef}>Sign up</button>
        </div>
      </div>
    </section>



  </>
}
export default Login;

