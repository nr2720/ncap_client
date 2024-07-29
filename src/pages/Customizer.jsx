import React, {useState, useEffect} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import config from '../config/config'
import state from '../store'
import { download } from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation, headTextAnimation } from '../config/motion'

import { AIPicker, ColorPicker, FilePicker, Tab, CustomButton } from '../components'

const Customizer = () => {
    const snap = useSnapshot(state)

    const [file, setFile] = useState('');

    const [prompt, setPrompt] = useState('');

    const [generateImg, setGenerateImg] = useState(false);





    const [activeEditor, setActiveEditor] = useState('')
    const [tabIsOpen, setTabIsOpen] = useState({
        color: false,
        file: false,
        ai: false,
    });






    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
        textCap: false,
    });

    useState(() => {
        console.log(activeFilterTab)
    }, [activeFilterTab])


    const handleTabClick = (tab) => {
        if(tab === 'colorpicker') {
            setTabIsOpen({
                color: !tabIsOpen.color,
                file: false,
                ai: false,
            });
        }
        else if(tab === 'filepicker') {
            setTabIsOpen({
                color: false,
                file: !tabIsOpen.file,
                ai: false,
            })
        } else {
            setTabIsOpen({
                color: false,
                file: false, 
                ai: !tabIsOpen.ai,
            })
        }
        setActiveEditor(tab)
    }


    // Show tab content depending on the active tab
    const generateTabContent = () => {
        switch(activeEditor) {
            case 'colorpicker':
                    return <ColorPicker
                    isOpen={tabIsOpen.color}
                    />
                    
            case 'filepicker':
                return <FilePicker 
                file={file}
                setFile={setFile} 
                readFile={readFile}
                isOpen={tabIsOpen.file}

                />;
            case 'aipicker':
                return <AIPicker 
                    prompt={prompt}
                    setPrompt={setPrompt}
                    generateImg={generateImg}
                    handleSubmit={handleSubmit}
                    isOpen={tabIsOpen.ai}
                />;
            default:
                return null;
            
        }
    }

    const handleSubmit = () => {
        if(!prompt) {
            return alert('Please enter a prompt');
        }
        state.logoText = prompt;
    }

    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];
        state[decalType.stateProperty] = result;

        if(!activeFilterTab[decalType.filterTab]){
            handleActiveFilterTab(decalType.filterTab)
        }

    }

    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case 'logoShirt':
                state.isLogoTexture = !snap.isLogoTexture;
                break;
            case 'stylishShirt':
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            case 'textLogo':
                state.isText = !snap.isText;
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;  
                state.isText = false; 
        }
         // after setting the state 
        
         setActiveFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
         })
    }

    const readFile = (type) => {
        reader(file)
        .then((result) => {
            handleDecals(type, result);
        })
    }
  return (
   <AnimatePresence>
        {snap.customizer &&(
        <>
            <motion.div
            {...fadeAnimation}
            >
            <h1 className='absolute font-message h2CustomMessage'
            >
                
                Pimp your cap</h1>
            </motion.div>
            <motion.div
            key='custom'
            
            className='absolute top-0 left-0 z-10 sideTabContainer'
                {...fadeAnimation}
            >
                <div className='flex item-center min-h-screen'>
                    <div className='editortabs-container tabs'>
                        {EditorTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                name={tab.name}
                                img={tab.icon}
                                handleClick={() => handleTabClick(tab.name)}
                            />
                        ))}
                        {generateTabContent()}
                    </div>
                </div>
            </motion.div>

            <motion.div
            className='absolute z-10 top-5 right-5 goBackButtonCustomizer' {...fadeAnimation}
            >
                <CustomButton
                    type='outline'
                    title='Go Back'
                    handleClick={() => {
                        state.intro = true;
                        state.customizer = false;
                    }}
                    customStyles='w-fit px-4 pw-2.5 font-bold text-sm'
                />
            </motion.div>
            <motion.div
            className='absolute z-10 bottom-32 buyButton buyButtonCustomizer' {...fadeAnimation}
            >
                <CustomButton
                    type='filled'
                    title='Buy your 🧢'
                    handleClick={() => {
                        state.checkout = true
                        state.customizer = false
                    }
                    }
                    customStyles='w-32 h-10 px-4 pw-2.5 font-bold text-sm'
                />
                
            </motion.div>
            
            <motion.div
            className='filtertabs-container gap-3'
            {...slideAnimation('up')}
            >
                {FilterTabs.map((tab) => (
                    <Tab 
                        key={tab.name}
                        tab={tab}
                        isFilterTab
                        isActiveTab={activeFilterTab[tab.name]}
                        handleClick={() => handleActiveFilterTab(tab.name)}
                    />
                ))}
            </motion.div>
        </>
        )}
   </AnimatePresence>
  )
}

export default Customizer