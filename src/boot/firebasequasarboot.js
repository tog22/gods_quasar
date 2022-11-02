import { boot } from 'quasar/wrappers'
import bus from '../supplements/bus'

export default boot(async ({ app, router, store }) => {
    
    // service worker

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('firebase-messaging-sw.js')
        .then(reg => {
            console.log(`Service Worker Registered (Scope: ${reg.scope})`);
        })
        .catch(error => {
                const msg = `Service Worker Error (${error})`;
            console.error(msg);
        });
    } else {
        // happens when the app isn't served over HTTPS or if the browser doesn't support service workers
        console.warn('Service Worker not available');
    }
	



    // import firebase from "firebase";

    // const firebaseConfig = {
    //     apiKey: "AIzaSyBGhSRGXLRM1m-nNMFNuJnSKu5AX--6vb0",
    //     authDomain: "godsgamefbase.firebaseapp.com",
    //     projectId: "godsgamefbase",
    //     storageBucket: "godsgamefbase.appspot.com",
    //     messagingSenderId: "306649763697",
    //     appId: "1:306649763697:web:228785d43cabe34913b0d0"
    // };

    // const firebase_instance = firebase.initializeApp(firebaseConfig)

    // firebase_instance.messaging().getToken({vapidKey: "BACyAFjs1KoHzgCkmXllHlmBBqj6yLbxcJSD4wjxjN-bJKl6zaWSevcaxkanK0RD05GJrPK-1yHodls6kGoaf4w"});


    // export default firebase_instance


})



