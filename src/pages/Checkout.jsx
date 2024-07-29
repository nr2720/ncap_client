import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import { CustomButton } from '../components'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'

import CheckoutForm from '../components/CheckoutForm'


// import StripeComponent from '../components/Stripe'

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation,
    fadeAnimation
} from '../config/motion'


const Checkout = () => {
 const snap = useSnapshot(state);

 return(
    <>
    <AnimatePresence>
    {snap.checkout && (
    <>
        <motion.div
        key='custom'
        className='absolute top-0 left-0 z-10'
            {...fadeAnimation}
        >
            <div className='flex item-center form-checkout bg-white border-r-8'>
                <CheckoutForm />
            </div>
        </motion.div>

        <motion.div
            className='absolute z-10 top-5 right-5' {...fadeAnimation}
            >
                <CustomButton
                    type='outline'
                    title='Go Back'
                    handleClick={() => {
                        state.checkout = false;
                        state.customizer = true;
                    }}
                    customStyles='w-fit px-4 pw-2.5 font-bold text-sm buttonCheckoutGoback'
                />
            </motion.div>

    </>
    )}
</AnimatePresence>
    </>
 )
}

export default Checkout;