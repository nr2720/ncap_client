import { useRef, useState } from 'react';
import CustomButton from './CustomButton';
import state from '../store';
import { useSnapshot } from 'valtio';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import html2canvas from 'html2canvas';


export default function CheckoutForm() {
    
    const snap = useSnapshot(state)
    const [isSurprise, setIsSurprise] = useState(false);
    const [capNumber, setCapNumber] = useState(1);
    const [fastShipping, setFastShipping] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(true);

    const [customizer, setCustomizer] = useState('');
    const [capImg, setCapImg] = useState(undefined);

    const isBreakPoint = window.innerWidth > 1260;
    const isMobile = window.innerWidth <= 600;
    const isMD = window.innerWidth < 1260 && window.innerWidth > 600;
 


    const headSize = [
        {
            id: 0,
            name: 'Small',
            metric: '54',
            us: '6 3/4'
        },
        {
            id: 1,
            name: 'Medium',
            metric: '57',
            us: '7 1/8'
        },
        {
            id: 2,
            name: 'Large',
            metric: '59',
            us: '7 3/8'
        },
        {
            id: 3,
            name: 'X-Large',
            metric: '61',
            us: '7 5/8'
        }
    ]

    const [headSelect, setHeadSelect] = useState(headSize[1]);





    //functions
    const handleCustomizerChange = (e) => {
        setCustomizer(e.target.value);
    }

    const handleCapNumberChange = (e) => {
        setCapNumber(e.target.value);
    }
    const handleIsSurprise = () => {
        setIsSurprise(!isSurprise);
    }
    const handleFastShipping = () => {
        setFastShipping(!fastShipping);
    }
    const handleIsTermsAccepted = () => {
        setIsTermsAccepted(!isTermsAccepted)
    }

    const handleHeadSelect = (e) => {
        setHeadSelect(headSize[e])
        state.capSize = headSize[e].name;
    }   

    const cropCanvas = (sourceCanvas, cropWidth, cropHeight) => {
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = cropWidth;
        offscreenCanvas.height = cropHeight;
        const ctx = offscreenCanvas.getContext('2d');
    
        // Calculate the cropping position (center crop)
        let xPosition = 475;
        let yPosition = (sourceCanvas.height - cropHeight) / 2;;
        if(isBreakPoint) {
            xPosition = 475;
        }
        else if (isMobile) {
            xPosition = 170;
            yPosition = 200;
        }
    

        const sourceWidth = sourceCanvas.width;
        const sourceHeight = sourceCanvas.height;
        const startX = xPosition;
        const startY = yPosition // Center vertically
    
        ctx.drawImage(
            sourceCanvas,
            startX, startY, cropWidth, cropHeight, // source x, y, width, height
            0, 0, cropWidth, cropHeight // destination x, y, width, height
        );
    
        return offscreenCanvas;
    };



    const captureScreenshot = async () => {
        const canvas = document.querySelector('#capCanvas');
        let xSize = 1000;
        let ySize = 1000;
        if(isMobile) {
            xSize = 500;
            ySize = 500
        }


        if (!canvas) {
            return '';

        }
        try {
            const screenshotCanvas = await html2canvas(canvas);
            const croppedImage = cropCanvas(screenshotCanvas, xSize, ySize);
            const image = croppedImage.toDataURL('image/jpeg');
            return image;
        } catch (err) {
            console.error('Failed to capture screenshot:', err);
            return '';
        }
    }



    





    const handleClickButton = async () => {
        if(!isTermsAccepted) {
            return;
        }
        const img = await captureScreenshot();
        const capColor = state.color;
        let capImgUrl;
        let orderId;
        let capSize;
        //sending image and info of image

        const imageSendingOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                capImg: img,
            })
        }

        try {
            // Wait for the image upload to complete
            const imageResponse = await fetch('http://localhost:3000/checkout/upload', imageSendingOptions);
            
            if (!imageResponse.ok) {
              // Handle HTTP errors
              const errorData = await imageResponse.json();
              throw new Error(`HTTP error! status: ${imageResponse.status}, message: ${errorData.message || 'Unknown error'}`);
            }
            
        
            const imageData = await imageResponse.json();
            capImgUrl = imageData.signedUrl;
            orderId = imageData.orderId;
            
            // Prepare data for Stripe session
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                capNumber: capNumber,
                fastShipping: fastShipping,
                isSurprise: isSurprise,
                isTermsAccepted: isTermsAccepted,
                capUrl: capImgUrl,
                capColor: capColor,
                description: customizer,
                orderId: orderId,
                //text
                isTextUsed: snap.isText,
                text: snap.logoText,
                textColor: snap.textColor,
                textSize: snap.textSize,
                textFont: snap.textFont.url,
                textPositionX: snap.positionTextX,
                textPositionY: snap.positionTextY,
                capSize: snap.capSize,
              })
            };

            const stripeResponse = await fetch('http://localhost:3000/checkout', requestOptions);
            const stripeData = await stripeResponse.json();
        
            if (stripeData) {
              window.location.replace(stripeData.url);
            }
        
          } catch (error) {
            // Handle network errors or other errors
            console.error('Error occurred:', error.message);
          }
        };



    return(
 
        <div className="formCheckoutDivOne">
            <h2 className='absolute h2CheckoutTitle .font-message'>Last few steps...</h2>
            <div className="inputGrouper flex flex-col justify-start items-start">
                <div className="flex items-center mb-4">
                    <label htmlFor="numberOfCap" className="ms-2 text-sm font-medium text-black mr-2">
                        Quantity:
                    </label>
                    <input
                        id='numberOfCap'
                        type='number'
                        value={capNumber}
                        onChange={handleCapNumberChange}
                        className="w-10 h-6 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 p-1"
                    />
                </div>
                <div className="flex items-center mb-4">
                    <input
                        checked={isSurprise}
                        id='isSurprise'
                        type='checkbox'
                        onChange={handleIsSurprise}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="isSurprise" className="ms-2 text-sm font-medium text-black">
                        Want (it, them) inside a surprise box ? 🎁
                    </label>

                </div>
                <div className="flex items-center mb-4">
                    <input
                        checked={fastShipping}
                        id='fastShipping'
                        type='checkbox'
                        value=''
                        onChange={handleFastShipping}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="fastShipping" className="ms-2 text-sm font-medium text-black">
                        Fast Shipping ✈️
                    </label>

                </div>
                    <Listbox value={headSelect} onChange={handleHeadSelect}>
                        <div className="relative mb-1">
                            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                                <span className="ml-3 block truncate">{headSelect.name}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                            </span>
                            </ListboxButton>

                            <ListboxOptions
                            transition
                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                            >
                            {headSize.map((size) => (
                                <ListboxOption
                                key={size.id}
                                name={size.name}
                                value={size.id}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                                >
                                <div className="flex items-center">
                                    <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                    {size.name}
                                    </span>
                                </div>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                                </span>
                                </ListboxOption>
                            ))}
            </ListboxOptions>
        </div>
                    </Listbox>
                <div className="flex items-center isTermAccepted">
                    <input
                    checked={isTermsAccepted}
                    id="checkbox-1"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleIsTermsAccepted}
                    />
                    <label htmlFor="checkbox-1" className="ms-2 text-sm font-medium text-black">
                    I agree to the{" "}
                    <a href="legal" className="text-blue-600 hover:underline dark:text-blue-500">
                        terms and conditions
                    </a>.
                    </label>
                </div>
            </div>

             <form className="message-checkout max-w-sm mx-auto">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Add more precision about the design of your cap...</label>
                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tell us about it ..." onChange={handleCustomizerChange}>{customizer}</textarea>
             </form>
                <CustomButton
                    type='filled'
                    title='Buy the cap'
                    handleClick={
                        handleClickButton
                    }
                    customStyles='w-fit px-4 pw-2.5 font-bold text-sm absolute buyButtonCheckout'
                />

            {!isTermsAccepted && (
                <p className='text-red-500 absolute acceptTermsRed'>Please accept the conditions before making a purchase</p>
            )}
             
        </div> 
    )
}