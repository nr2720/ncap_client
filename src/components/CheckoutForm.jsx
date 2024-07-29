import { useRef, useState } from 'react';
import CustomButton from './CustomButton';
import state from '../store';
import { useSnapshot } from 'valtio';


export default function CheckoutForm() {
    
    const snap = useSnapshot(state)
    const [isSurprise, setIsSurprise] = useState(false);
    const [capNumber, setCapNumber] = useState(1);
    const [fastShipping, setFastShipping] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(true);

    const [customizer, setCustomizer] = useState('');
    const [capImg, setCapImg] = useState(state.logoDecal);


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




    const canvasRef = useRef();

    const captureScreenshot = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'screenshot.jpg';
        link.click();
    };

    





    const handleClickButton = async () => {
        if(!isTermsAccepted) {
            return;
        }
        const capColor = state.color;
        let capImgUrl;
        let orderId;
        //sending image and info of image

        const imageSendingOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                capImg: capImg,
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
            console.log(snap.logoText)
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
        <>
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
                <div className="flex items-center mb-4">
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
             
        </>
    )
}