import React from 'react'
import {useState} from 'react';
import CustomButton from './CustomButton';
import { List, ListItem, Card } from "@material-tailwind/react";
import 'animate.css'
import state from '../store';
import { useSnapshot } from 'valtio';



const MenuDefault = () => {
    const snap = useSnapshot(state);
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = (type) => {
        setIsOpen(false);
        switch(type) {
            case 1:
                state.intro = false;
                state.checkout = false;
                state.customizer = false;
                state.explainAbout = true;
                state.explainLogo = false;
                state.explainTerms = false;
                state.explainContact = false;
                state.isSent = false;
                break;
            case 2:
                state.intro = false;
                state.checkout = false;
                state.customizer = false;
                state.explainAbout = false;
                state.explainLogo = true;
                state.explainTerms = false;
                state.explainContact = false;
                state.isSent = false;
                break;
            case 3: 
                state.intro = false;
                state.checkout = false;
                state.customizer = false;
                state.explainAbout = false;
                state.explainLogo = false;
                state.explainTerms = true;
                state.explainContact = false;
                state.isSent = false;
                break;
            case 4:
                state.intro = false;
                state.checkout = false;
                state.customizer = false;
                state.explainAbout = false;
                state.explainLogo = false;
                state.explainTerms = false;
                state.explainContact = true;
                state.isSent = false;
                break;
            default:
                break;
        }
    }



  return (
  <>
    <div className='menuTab'>
    <CustomButton
        type='filled'
        title='Menu'
        handleClick={() => {
            setIsOpen(!isOpen);
        }}
        customStyles='w-fit px-4 pw-2.5 font-bold text-sm'
    />
    </div>
   { isOpen && (
     <Card className="w-96 absolute menuOptions animate__animated animate__fadeIn">
     <List className='flex flex-col gap-1 items-center'>
       <ListItem className='listItemMenu' onClick={() => {
      handleMenuClick(1)
       }}>Who are we</ListItem>
       <ListItem className='listItemMenu' onClick={() => {
      handleMenuClick(2)
       }} >Get your own logo</ListItem>
       <ListItem className='listItemMenu' onClick={() => {
      handleMenuClick(3)
       }}>Terms and conditions</ListItem>
       <ListItem className='listItemMenu' onClick={() => {
      handleMenuClick(4)
       }}>Contact us</ListItem>
     </List>
   </Card>
    )}

    </>
    )
}

export default MenuDefault