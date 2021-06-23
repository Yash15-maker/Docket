import firebase from 'firebase/app';
import 'firebase/database';

import config from './env';

if(!firebase.apps.length){
    firebase.initializeApp(config);
}

const db = firebase.database();
export default db;