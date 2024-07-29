import { redirect } from 'react-router-dom';
import { proxy } from 'valtio';

const state = proxy({
    intro: true,
    customizer: false,
    checkout: false,
    explainAbout: false,
    explainLogo : false,
    explainTerms: false,
    explainContact: false,
    color: '#000',
    isLogoTexture: true,
    isFullTexture: false,
    isText: false,
    logoDecal: '/ncp.png',
    fullDecal: './jesse.png',
    isSent: false,

    //text
    isTextUsed: false,
    logoText: 'Write on me',
    positionTextX: -0.032,
    positionTextY: 0.055,
    sizeText: 0.0085,
    textColor: '#ffffff', 
    textFont: {
        id: 0,
        name: '.font-roboto',
        key: 'Roboto',
        url: 'font/roboto.json'
      },
})

export default state