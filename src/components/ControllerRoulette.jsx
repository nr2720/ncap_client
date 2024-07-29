import React from 'react'
import state from '../store'
import { useSnapshot } from 'valtio'




const ControllerRoulette = () => {
    const snap = useSnapshot(state)


    //handle click text position
    const handleClickDown = () => {
        const newDown = snap.positionTextY - 0.0007;
        state.positionTextY = newDown;
    }

    const handleClickUp = () => {
        const newUp = snap.positionTextY + 0.0007;
        state.positionTextY = newUp;
    }
    const handleClickRight = () => {
        const newRight = snap.positionTextX - 0.0007;
        state.positionTextX = newRight;
    }
    const handleClickLeft = () => {
        const newLeft = snap.positionTextX + 0.0007;
        state.positionTextX = newLeft;
    }




  return (
  <div className="divControllerRoulette">
    <button 
      type="button" 
      className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-1 hover:bg-red-700 hover:text-white px-1 w-10 h-8 buttonRouletteRight"
      onClick={handleClickRight}
    >
      <div className="flex flex-row align-middle justify-center items-center">
        <svg 
          className="w-4" 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fillRule="evenodd" 
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" 
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </button>


    <button 
      type="button" 
      className="bg-gray-800 text-white rounded-r-md py-1.3 border-l border-gray-200 hover:bg-red-700 hover:text-white mr-8 h-8 buttonRouletteLeft w-10"
      onClick={handleClickLeft}
    >
      <div className="flex flex-row align-middle justify-center items-center">
        <svg 
          className="w-4" 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fillRule="evenodd" 
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </button>




    <button 
      type="button" 
      className="bg-gray-800 text-white rounded-t-md py-1.3 border-b border-gray-200 hover:bg-red-700 hover:text-white px-3 h-8 buttonRouletteUp w-10"
      onClick={handleClickUp}
    >
      <div className="flex flex-row align-middle items-center justify-center">
        <svg 
          className="w-4" 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
    <path 
        fillRule="evenodd" 
        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" 
        clipRule="evenodd"
    ></path>
        </svg>
      </div>
    </button>


    <button 
      type="button" 
      className="bg-gray-800 text-white rounded-b-md py-1.3 border-t border-gray-200 hover:bg-red-700 hover:text-white px-3 h-8 buttonRouletteDown w-10"
      onClick={handleClickDown}
    >
      <div className="flex flex-row align-middle justify-center items-center">
        <svg 
          className="w-4" 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
        <path 
            fillRule="evenodd" 
            d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 14.586V3a1 1 0 112 0v11.586l2.293-2.293a1 1 0 011.414 0z" 
            clipRule="evenodd"
        ></path>
        </svg>
      </div>
    </button>
  </div>

  )
}

export default ControllerRoulette