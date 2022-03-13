
/*import React, { Component } from "react";
// import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import { initializeApp } from 'firebase/app';

import firebase from 'firebase/compat/app';


const firebaseConfig = {
  apiKey: "AIzaSyCdfT3xrykrR0E7vs5UCm4amkkxSq-1fkw",
  authDomain: "myschool-d3204.firebaseapp.com",
  projectId: "myschool-d3204",
  storageBucket: "myschool-d3204.appspot.com",
  messagingSenderId: "188006964157",
  appId: "1:188006964157:web:16f453f74aa6d0ca8a10d4",
  measurementId: "G-R851XDE477",
  databaseURL: "https://myschool-d3204-default-rtdb.firebaseio.com",
};
initializeApp(firebaseConfig);

// export default 
function FileUpload(props){
const setFile= props.setFile;

    // const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);

    return <input type="file" />
}



class ProfilePage extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };
 
  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };
 
  render() {
    return (
      <div>
        <form>
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChangeUsername}
          />
          <label>Avatar:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} />}
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </form>
      </div>
    );
  }
}*/
 
// export  ProfilePage;





import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCdfT3xrykrR0E7vs5UCm4amkkxSq-1fkw",
  authDomain: "myschool-d3204.firebaseapp.com",
  projectId: "myschool-d3204",
  storageBucket: "myschool-d3204.appspot.com",
  messagingSenderId: "188006964157",
  appId: "1:188006964157:web:16f453f74aa6d0ca8a10d4",
  measurementId: "G-R851XDE477",
  databaseURL: "https://myschool-d3204-default-rtdb.firebaseio.com",
};
initializeApp(firebaseConfig);

class FileUpload extends React.Component {
 constructor() {
  super();
   this.state = {
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: ''
   };
 }
 handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
 handleProgress = (progress) => this.setState({ progress });
 handleUploadError = (error) => {
  this.setState({ isUploading: false });
  console.error(error);
 }
 handleUploadSuccess = (filename) => {
  this.setState({ avatar: filename, progress: 100, isUploading: false });
  firebase.storage().ref('').child(filename).getDownloadURL().then(url => this.setState({ avatarURL: url }));
 };
 render() {
  return (
   <div>
    <form>
    
     {this.state.isUploading &&
      <p>Progress: {this.state.progress}</p>
     }
     {this.state.avatarURL &&
      <img src={this.state.avatarURL} />
     }
     <FileUploader
      accept="image/*"
      name="avatar"
      randomizeFilename
      storageRef={firebase.storage().ref('images')}
      onUploadStart={this.handleUploadStart}
      onUploadError={this.handleUploadError}
      onUploadSuccess={this.handleUploadSuccess}
      onProgress={this.handleProgress}
     />
    </form>
   </div>
  );
 }
}
export default FileUpload;