import { useState } from 'react';
import ParticlesBg from 'particles-bg'
import '../style/App.css';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import ImageLinkForm from '../components/ImageLinkForm'
import Rank from '../components/Rank'
import FaceRecognition from '../components/FaceRecognition'
// import Clarifai from 'clarifai';

function App() {
  const [ input, setInput ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ box, setBox ] = useState({});
  const [ imageSize, setImageSize ] = useState([]);

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

      fetch("https://cors-anywhere.herokuapp.com/https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => {

          const regions = result.outputs[0].data.regions;
          let imageElement = document.getElementById('display-img');
          let width = Number(imageElement.width);
          let height = Number(imageElement.height);
          setImageSize([width, height]);
          

          regions.forEach(region => {
              // Accessing and rounding the bounding box values
              const boundingBox = region.region_info.bounding_box;
              const box = [Number(boundingBox.top_row.toFixed(3)*height),
                          Number(boundingBox.left_col.toFixed(3)*width),
                          Number(boundingBox.bottom_row.toFixed(3)*height),
                          Number(boundingBox.right_col.toFixed(3)*width)];
              setBox(box);

              // region.data.concepts.forEach(concept => {
              //     // Accessing and rounding the concept value
              //     const name = concept.name;
              //     const value = concept.value.toFixed(4);

              //     //console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
              //     console.log(box);
              // });

                // if(onNewImageUrl !== '') {
                  // let { x, y, w, h } = onNewCanvas;
                  // const currentImg = document.getElementById('display-img');
                  // console.log(currentImg);
                  // let imgW = currentImg.width;
                  // let imgH = currentImg.height;
                  // const c = document.getElementById("face-canvas");
                  // let ctx = c.getContext("2d");
                  // ctx.strokeStyle = "green";
                  // ctx.strokeRect(x, y, w, h);
              // }
          });

      })
      .catch(error => console.log('error', error));
  }

  const onInputChange = (event  => {
    setInput(event.target.value);
  });

  const onButtonSubmit = () => {
    setImageUrl(input);
    requestDetection(input);
  }

  const calculateFaceLocation = () => {
    return 
  }

  return (
    <div className="app">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}/>
      <ParticlesBg type="cobweb" bg={false}/>
      <FaceRecognition onNewImageUrl={imageUrl} onNewCanvas={box} onImageSize={imageSize}/>
    </div>

  )
}

export default App;
