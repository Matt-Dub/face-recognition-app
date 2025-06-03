import { Component } from 'react';
import ParticlesBg from 'particles-bg'
import '../style/App.css';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import ImageLinkForm from '../components/ImageLinkForm'
import Rank from '../components/Rank'
import FaceRecognition from '../components/FaceRecognition'
// import Clarifai from 'clarifai';



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }


  

  requestDetection = async function (REQUEST_IMG_URL) {
    
    IMAGE_URL = REQUEST_IMG_URL;

        
  }

  onInputChange = (event)  => {
    this.setState(() => {return { input : event.target.value }});
  };

  onButtonSubmit = () => {
    this.setState(() => {return { imageUrl : this.state.input }});

    const PAT = '79e9789fe0d44d42910ad0b723aed2f1';
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    console.log('url', this.state.input);
    let IMAGE_URL = this.state.input;

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
          let box = [];

          regions.forEach(region => {
              // Accessing and rounding the bounding box values
              const boundingBox = region.region_info.bounding_box;
              box.push([Number(boundingBox.top_row.toFixed(3)),
                          Number(boundingBox.left_col.toFixed(3)),
                          Number(boundingBox.bottom_row.toFixed(3)),
                          Number(boundingBox.right_col.toFixed(3))]);
              return box;
          });
          console.log('box', box);

      })
      .catch(error => console.log('error', error));
    }

  // calculateFaceLocation = () => {
  //   return 
  // }
  render () {
    return (
      <div className="app">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}/>
        <ParticlesBg type="cobweb" bg={false}/>
        <FaceRecognition onNewImageUrl={this.imageUrl}/>
      </div>
  
    )
  }
}

export default App;
