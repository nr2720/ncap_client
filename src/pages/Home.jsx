import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import { CustomButton } from '../components'

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../config/motion'

const Home = () => {
    const snap = useSnapshot(state);
  return (
    <AnimatePresence>
        {snap.intro && (
            <motion.section className='home' {...slideAnimation('left')}>
                <motion.header {...slideAnimation('down')}>
                </motion.header>
                <motion.div className='home-content' {...headContainerAnimation}>
                    <motion.div {...headTextAnimation}>
                        <h1 className='head-text'>
                            Make <br></br> your 🧢
                        </h1>
                    </motion.div>
                    <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
                        <p   className='max-w-md font-normal text-gray-600'>Use your imagination to create your own cap design.<br></br> <strong>When you're done, we'll deliver it to you. </strong> <br></br>You design, we deliver. No 🧢</p>
                        <CustomButton
                         type='filled' 
                         title='Try it' 
                         handleClick={() => {
                            state.intro = false;
                            state.customizer = true;
                         }}
                         customStyle='w-fit px-4 py-2.5 font-bold text-sm'
                         />
                    </motion.div>
                </motion.div>
            </motion.section>
        )}
    </AnimatePresence>
  )
}

export default Home