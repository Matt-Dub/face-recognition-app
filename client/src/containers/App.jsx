import { useState, useEffect } from 'react';
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

const initState = {
  id: '',
  name: '',
  email: '',
  entries: 0,
  joined: ''
};

function App() {

  useEffect(() => {
    fetch('http://localhost:3000')
    .then(response => response.json())
    .then(console.log);
  }, []);

  useEffect(() => {

  })

  const [ input, setInput ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ box, setBox ] = useState({});
  const [ route, setRoute ] = useState('signin');
  const [ isSignedIn, setSignedIn ] = useState(false);
  const [ user, setUser ] = useState(initState);

  let PAT = '';
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
  let IMAGE_URL = '';

  const requestDetection = async function (REQUEST_IMG_URL, PAT) {
    
    try {
      const resp1 = await fetch('http://localhost:3000/imageUrl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: input
          })
        })

        const data = await resp1.json();
        console.log('1st fetch: ', data)
        PAT = data;
    } catch (err) {
      console.log('THERE\'S AN ERROR on 1st FETCH!', error);
    }

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

        console.log('2nd fetch: ', PAT);
      
      try {

        const clairifiCall = await fetch('https://cors-anywhere.herokuapp.com/https://api.clarifai.com/v2/models/' + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions, {
          headers: {'Access-Control-Allow-Origin': '*'}
        })
        const clairifiResponse = await clairifiCall.json();

        
            const regions = clairifiResponse.outputs[0].data.regions;
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
              return setBox(boxes);
          })
        
      } catch(err) {
        console.log('THERE\'S AN ERROR!', error)
      }



      try {

        console.log('fetching server image...');
        const imageServerCall = await fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })

        const dbResponse = await imageServerCall.json();
        console.log('imageResponse: ', dbResponse[0])
        setUser(dbResponse[0]);

      } catch (err) {
        console.log('error image: ', err)
      }
      return user;
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
      setUser(initState);
    } else {
      setSignedIn(true);
    }

    setRoute(route);
  }

  const loadUser = (user) => {
    setUser(user);
  }

  return (
    <div className="app">
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChage}/>
      {route !== 'home'
        ? ( route === 'signin'
          ? <SignIn onRouteChange={onRouteChage} loadUser={loadUser}/>
          : <Register onRouteChange={onRouteChage} loadUser={loadUser}/>)
        : <div className='front-app-wrapper'>
            <div className='front-app'>
              <Logo />
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm
                onInputChange={onInputChange}
                onButtonSubmit={onButtonSubmit}/>
              <FaceRecognition onNewImageUrl={imageUrl} onNewCanvas={box}/>
            </div>
          </div>}
          <ParticlesBg type="cobweb" bg={true} color={'#FDD787'}/>
    </div>

  )
}

export default App;
