

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
 
const firebaseConfig = {
    apiKey: "AIzaSyBLJ8d59yt911BUld1smVc7I5yqAud7fCY",
    authDomain: "samdemo-8bda2.firebaseapp.com",
    projectId: "samdemo-8bda2",
    storageBucket: "samdemo-8bda2.appspot.com",
    messagingSenderId: "737659344808",
    appId: "1:737659344808:web:eeb416ef86987ba59f2f9d",
    measurementId: "G-9ZMGJPEBN3"
};


initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


export const getTokens = (setTokenFound) => {
    console.log("bsccdvnd")
    return getToken(messaging, { vapidKey: "BIKMQZu-Y_IvATAu3ErOGLiIAnrijW5OS5NiWLQ08PT672s6oz9vY1uNCzDuYfjccFuYqYHYmwRjv5n0ilOyFD4" })
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                const topic = 'all'
                const fcm_server_key = 'AAAAq7_sV6g:APA91bG6Xvh5pHMdtW62zNm5DLydNVxrWOHVCXFm5LQqNZoJEgFt2gj7PlzV71sEbSy_jMTsNWkQbb6CZcOLa9KTHXx5B7IoBjkyAvtlMCLV3yoq-zzSl5W8qTVzCBXpkyzwYFZwjb-0'
                setTokenFound(true);
                
                fetch('https://iid.googleapis.com/iid/v1/'+currentToken+'/rel/topics/'+topic, {
                    method: 'POST',
                    headers: new Headers({
                    'Authorization': 'key='+fcm_server_key
                    })
                }).then(response => {
                    if (response.status < 200 || response.status >= 400) {
                    throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
                    }
                    console.log('Subscribed to "'+topic+'"');
                }).catch(error => {
                    console.error(error);
                })
                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                console.log('No registration token available. Request permission to generate one.');
                setTokenFound(false);
                // shows on the UI that permission is required 
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // catch error while creating client token
        });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });