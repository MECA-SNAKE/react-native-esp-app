import firebase from "firebase";

// Define a variable of the project name, which is used in the config parameters for firebase
const firebaseProjectName = "snake-mit"

// Parameters required by the initializeApp used below
const config = {
  apiKey: "<YOUR_WEB_API_KEY>",
  authDomain: `${firebaseProjectName}.firebaseapp.com`,
  databaseURL: `https://${firebaseProjectName}.firebaseio.com`,
  projectId: `${firebaseProjectName}`
};

firebase.initializeApp(config);

export default firebase;