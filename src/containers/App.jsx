import { useState } from 'react';
import ParticlesBg from 'particles-bg'
import '../style/App.css';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import ImageLinkForm from '../components/ImageLinkForm'
import Rank from '../components/Rank'
import FaceRecognition from '../components/FaceRecognition'
import SignIn from '../components/SignIn/SignIn'
import Register from '../components/SignIn/Register'
// import Clarifai from 'clarifai';

function App() {

  const [ input, setInput ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ box, setBox ] = useState({});
  const [ route, setRoute ] = useState('signin');
  const [ isSignedIn, setSignedIn ] = useState(false);

  const PAT = '79e9789fe0d44d42910ad0b723aed2f1';
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
  let IMAGE_URL = '';

  const requestDetection = async function (REQUEST_IMG_URL) {
    
    IMAGE_URL = REQUEST_IMG_URL;

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                            // "base64": IMAGE_BYTES_STRING
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };

      const resp = await fetch("https://cors-anywhere.herokuapp.com/https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => {

          const regions = result.outputs[0].data.regions;
          let imageElement = document.getElementById('display-img');
          let width = Number(imageElement.width);
          let height = Number(imageElement.height);
          let boxes = [];

          regions.forEach(region => {
              // Accessing and rounding the bounding box values
              const boundingBox = region.region_info.bounding_box;
              boxes.push([Number(boundingBox.top_row.toFixed(2)*height),
                          Number(boundingBox.left_col.toFixed(2)*width),
                          Number(height - (boundingBox.bottom_row.toFixed(2)*height)),
                          Number(width - (boundingBox.right_col.toFixed(2)*width))]);
              setBox(boxes);
          });
          

      })
      .catch(error => console.log('THERE\'S AN ERROR!', error));
  }

  const onInputChange = (event  => {
    setInput(event.target.value);
  });

  const onButtonSubmit = () => {
    setImageUrl(input);
    requestDetection(input);
  }

  const onRouteChage = (route) => {
    if(route !== 'home') {
      setSignedIn(false);
    } else {
      setSignedIn(true);
    }

    setRoute(route);
  }

  return (
    <div className="app">
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChage}/>
      {route !== 'home'
        ? ( route === 'signin'
          ? <SignIn onRouteChange={onRouteChage} />
          : <Register onRouteChange={onRouteChage} />)
        : <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}/>
            <FaceRecognition onNewImageUrl={imageUrl} onNewCanvas={box}/>
          </div>}
          <ParticlesBg type="cobweb" bg={false}/>
    </div>

  )
}

export default App;
