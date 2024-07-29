import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import { CustomButton } from '../components'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation,
    fadeAnimation
} from '../config/motion'


const MenuExplain = () => {
 const snap = useSnapshot(state);

 let navigate = useNavigate();
 const routeChange = () => {
     let path = `/legal`;
     navigate(path);

 }

 //State for is loading and is sent

 const [isLoading, setIsLoading] = useState(false);

 //State for contact us form

 const  [name, setName] = useState('');
 const [subject, setSubject] = useState('');
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('');
 const [message, setMessage] = useState(''); 

 //Function to handle change of the state

 const handleNameChange = (e) => {
    setName(e.target.value);
 }
 const handleSubChange = (e) => {
    setSubject(e.target.value);
 }
 const handleEmailChange = (e) => {
    setEmail(e.target.value);
 }
 const handlePhoneChange = (e) => {
    setPhone(e.target.value);
 }
 const handleMessageChange = (e) => {
    setMessage(e.target.value);
 }


//Handle the mail send
 const handleMailSent = async () => {
    try {
      const response = await fetch('http://localhost:3000/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          subject: subject,
          email: email,
          message: message,
          phone: phone,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse the JSON response
      const data = await response.json();
      setIsLoading(false);  
      state.isSent = true;

    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      setIsSent(true);
    }
  };

 return(
    <>
    <AnimatePresence>
    {snap.explainAbout ? (
    <>  
        <div className="explainDivSection">
        <h2 className='head-text-explain'>Who are <br></br> we ?</h2>
            <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
                        <p   className='max-w-md font-normal text-gray-600'>Nocap is a full-service creative agency specializing in branding, design and product conception. <strong>We have been helping business and customers getting their idea into reality.</strong> <br></br> <br></br> Our team of talented designers are passionate about delivering the perfect product for the customer need!</p>
                        <p   className='max-w-md font-normal text-gray-600'>Here, you can create your personalized cap, with your own logo amnd the color of your choice. When you're ready, we immediatly ship to you the customized cap. Really nice, huh ? <br></br> <br></br> <strong>You can also ask us to create from scratch the cap of your choice, with your instruction</strong> <br></br>Or we can also create the logo of your company and get merch shipped to you. You decice!</p>
                        <p   className='max-w-md font-normal text-gray-600'>Easy as 1,2,3.<br></br> <strong> Start customizing your cap, or get in touch with us!</strong></p>
            <div className="buttonDivAbout">
                <CustomButton
                    type='outline'
                    title='Customize your 🧢'
                    handleClick={() => {
                        state.explainAbout = false;
                        state.customizer = true;
                    }}
                    customStyles='w-fit px-4 pw-2.5 font-bold text-sm'
                />
                <CustomButton
                    type='filled'
                    title='Contact us !'
                    handleClick={() => {
                        state.explainAbout = false;
                        state.explainContact = true;
                    }}
                    customStyles='w-fit px-4 pw-2.5 font-bold text-sm'
                />
            </div>
            </motion.div>

        </div>
    </>
    ) : snap.explainLogo ? (
        <>
        <div className="explainDivSection">
        <h2 className='head-text-explain'>Your brand vision<br></br></h2>
            <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
                        <p   className='max-w-md font-normal text-gray-600'>You want to take your brand, eterprise or business to a next level ? Let us produce for you business cap with your own logo on it.</p>
                        <p   className='max-w-md font-normal text-gray-600'><strong>We</strong> handle everything. No need to make it more complicated that it really is, <strong>we</strong> write down your vision and ideas for the cap, <strong>we</strong> produce it with premium quality and ship it to you at the cheapest price!</p>
                        <p   className='max-w-md font-normal text-gray-600'>You can take your order directly online through a form, or schedule a call with us. The more you give us instruction, the better your cap will be!</p>
            <div className="buttonDivAbout">
                <CustomButton
                    type='outline'
                    title='Customize your 🧢'
                    handleClick={() => {
                        state.explainLogo = false;
                        state.customizer = true;
                    }}
                    customStyles='w-fit px-4 pw-2.5 font-bold text-sm'
                />
                <CustomButton
                    type='filled'
                    title='Contact us !'
                    handleClick={() => {
                        state.explainLogo = false;
                        state.explainContact = true;
                    }}
                    customStyles='w-fit px-4 pw-2.5 font-bold text-sm'
                />
            </div>
            </motion.div>

        </div>
        </>
    ) : snap.explainTerms ? (
        <>
        <div className="explainDivSection">
        <h2 className='head-text-explain'>Terms and conditions<br></br></h2>
            <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
            <CustomButton
                    type='filled'
                    title='Read the legal terms and condition'
                    handleClick={() => {
                        state.intro = true;
                        state.explainTerms = false;
                        routeChange()
                    }}
                    customStyles='w-fit px-4 pw-2.5 font-bold text-sm'
                />
            </motion.div>

        </div>
        </>
    )  : snap.explainContact ? (
        <>


        <div className="explainDivContactUs">
        <h2 className='head-text-explain-contact'>Get in touch,<br></br>Anytime.</h2>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">What is your name ?</label>
            <input
              type="text"
              id="name"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Your name here"
              value={name}
              onChange={handleNameChange}
              required
            />



            <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">What can we do for you?</label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              value={subject}
              onChange={handleSubChange}
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">What is your email ?</label>
            <input
              type="email"
              id="email"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="The way we can reach back to you..."
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">What is your phone number ?</label>
            <input
              type="tel"
              id="phone"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="The way we can reach back to you..."
              required
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
             <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">What are your instructions ?</label>
            <textarea
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Write your vision here..."
              value={message}
              onChange={handleMessageChange}
            ></textarea>
          </div>
          <CustomButton
                    type='filled'
                    title='Send the inquiry'
                    handleClick={() => {
                        if(email != '' && message != '') {
                            state.explainTerms = false;
                            state.explainContact = false;
                            setIsLoading(true)
                            handleMailSent();
                        }
                    }}
                    customStyles='w-fit px-4 pw-2.5 font-bold text-sm formContactButton'
                />
        </div>
        </>
    )  : isLoading ? (
    <>
        <div className="explainDivSection">
            <h2>Sending mail ...</h2>
        </div>

    </>
    
    ) : snap.isSent ? (
    <>
        <div className="explainDivSection">
            <h2>Thank you for sending the mail!</h2>
        </div>
    
    </>
    ) : null} 
    </AnimatePresence>
    </>
 )
}

export default MenuExplain;