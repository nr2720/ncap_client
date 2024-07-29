import React from 'react'
import CustomButton from './CustomButton';
import ControllerRoulette from './ControllerRoulette'
import SelectFont from './SelectFont';

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
  const [color, setColor] = useState(snap.textColor);
  const [value, setValue] = useState(3);

  const handleChangeColor = (e) => {
    setColor(e.target.value);
    state.textColor = color;
  }

  const handleChangeSizeText = (e) => {
    let inputText = e.target.value;
    console.log(inputText)
    switch (inputText) {
      case '0':
        setValue(inputText);
        setSize(0.0045);
        break;
      case '1': 
      setValue(inputText);
      setSize(0.005);
        break;
      case '2':
        setValue(inputText);
        setSize(0.0065);
        break;
      case '3': 
      setValue(inputText);
      setSize(0.0085);
        break;
      case '4':
        setValue(inputText);
        setSize(0.01);
        break;
      case '5':
        setValue(inputText);
        setSize(0.0125);
      break;
      default:
        break;
    }
  }






  return (
    isOpen && (

    <div className='aipicker-container'>
      <textarea 
        placeholder='Write something you want to appear on the cap ...'
        className='aipicker-textarea textAreaText'
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
     
        <input type="color" className='w-10/12 ml-4 p-0' value={color} onChange={handleChangeColor}/>
        <input type="number" min='0' max='5' value={value} placeholder="Size..."className='w-10/12 ml-4 p-0' onChange={handleChangeSizeText} />
        <SelectFont />
      <ControllerRoulette/>
      <>
            <CustomButton
              type='outline'
              title='Apply'
              handleClick={() => handleSubmit('logo')}
              customStyles='text-xs'
             />
          
          </>
    </div>
    )
  )
}

export default AIPicker