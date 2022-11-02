<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container    >
            <router-view    />
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent, provide } from 'vue';
import store from '../store'
import bus from '../supplements/bus'

import firebase from 'firebase'


export default defineComponent({
    name: 'MainLayout',
    setup () {
        
        ////////////////
        //    FIREBASE    //
        //    Create firebase messaging in app, in addition to service worker

        const firebaseConfig = {
			apiKey: "AIzaSyBGhSRGXLRM1m-nNMFNuJnSKu5AX--6vb0",
			authDomain: "godsgamefbase.firebaseapp.com",
			projectId: "godsgamefbase",
			storageBucket: "godsgamefbase.appspot.com",
			messagingSenderId: "306649763697",
			appId: "1:306649763697:web:228785d43cabe34913b0d0"
		};

		firebase.initializeApp(firebaseConfig);

		let firebase_messaging = firebase.messaging()

		console.log('Firebase cloud messaging object', firebase_messaging)
		
		const vapid_token = firebase_messaging.getToken({vapidKey: "BACyAFjs1KoHzgCkmXllHlmBBqj6yLbxcJSD4wjxjN-bJKl6zaWSevcaxkanK0RD05GJrPK-1yHodls6kGoaf4w"});
		lo('FCM registration token to add to Firebase console test messaging = ')
		lo(vapid_token)
		
		firebase_messaging.onMessage((message) => {
			console.log('gggfdgfgffgggfgdfggf')
			let msg_body = fcm_body_to_object(message.notification.body)
			/* Example message to send:
			
				title: 
				Move
				
				body:
				
				{
					"inspiration": false,
					"piece": {
						"from_row":	7,
						"from_col":	4,
						"to_row":		6,
						"to_col":		4,
						"type":		"mortal",
						"side":		2
					}
				}
				
			*/
			switch (message.notification.title) {
				case 'move':
					bus.emit('move', msg_body)
					break
				default: { // {} to allow `let`
					let alert_text = 'Unknown firebase message received: '+JSON.stringify(message.notification)
					alert(alert_text)
					break
				}
			}
		})

        provide('store',store)

        return {
        }
    },
})

function fcm_body_to_object(string) {
	
	string.replace('\"', '"')
	let object = JSON.parse(string)
	return object
	
}

let lo = function (to_log) { 
	console.log(to_log) 
}



</script>
