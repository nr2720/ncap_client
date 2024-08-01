import React from 'react'
import CustomButton from './CustomButton';
import ControllerRoulette from './ControllerRoulette'
import SelectFont from './SelectFont';
import SelectSize from './SelectSize';

import state from '../store';
import { useSnapshot } from 'valtio';
import { useState, useEffect } from 'react';


const AIPicker = ({ prompt, setPrompt, generateImg, handleSubmit, isOpen }) => {
  const snap = useSnapshot(state);

  const [size, setSize] = useState(snap.sizeText);

  useEffect(() => {
    state.sizeText = size;
  }, [size]);

  //Color State
  const [realPrompt, setRealPrompt] = useState(snap.logoText)
  const [color, setColor] = useState(snap.textColor);
  const [value, setValue] = useState(3);

  const handleChangeColor = (e) => {
    setColor(e.target.value);
  }

  const handleChange = (e) => {
    setRealPrompt(e.target.value)
  }

  useEffect(() => {
    state.logoText = realPrompt;
  }, [realPrompt])


  useEffect(() => {
    state.textColor = color;
  }, [color])







  return (
    isOpen && (

    <div className='aipicker-container'>
      <textarea 
        placeholder='Write somethings...'
        className='aipicker-textarea textAreaText text-white'
        rows={5}
        value={snap.logoText}
        onChange={handleChange}
      />
        <div className="inputContainer">
        <SelectSize />
        <SelectFont />
        </div>

      <input type="color" className='w-10/12 p-0 rouletteColor' value={color} onChange={handleChangeColor}/>
      <ControllerRoulette/>
      <>
            {/* <CustomButton
              type='filled'
              title='Apply'
              handleClick={() => handleSubmit('logo')}
              customStyles='text-xs buttonApplyText'
             /> */}
          
          </>
    </div>
    )
  )
}

export default AIPicker