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

// import firebase from 'firebase'
// import firebase from 'firebase/compat/app'

export default defineComponent({
    name: 'MainLayout',
    setup () {

        ////////////////
        //    FIREBASE    //
        //    Create firebase messaging in app, in addition to service worker

        // const firebaseConfig = {
		// 	apiKey: "AIzaSyBGhSRGXLRM1m-nNMFNuJnSKu5AX--6vb0",
		// 	authDomain: "godsgamefbase.firebaseapp.com",
		// 	projectId: "godsgamefbase",
		// 	storageBucket: "godsgamefbase.appspot.com",
		// 	messagingSenderId: "306649763697",
		// 	appId: "1:306649763697:web:228785d43cabe34913b0d0"
		// };

		// firebase.initializeApp(firebaseConfig);

		// let firebase_messaging = firebase.messaging()

		// console.log('Firebase cloud messaging object', firebase_messaging)

		// const vapid_token = firebase_messaging.getToken({vapidKey: "BACyAFjs1KoHzgCkmXllHlmBBqj6yLbxcJSD4wjxjN-bJKl6zaWSevcaxkanK0RD05GJrPK-1yHodls6kGoaf4w"});
		// lo('FCM registration token to add to Firebase console test messaging = ')
		// lo(vapid_token)

		// firebase_messaging.onMessage((message) => {
		// 	console.log('📨 Message received')
		// 	console.log(message)
		// 	let msg_data = message.data
		// 	/* Example message to send:

		// 		title:
		// 		Move

		// 		body:
		// 		"It's your turn"

		// 		data:
		// 		{
		// 			current_player:
		// 			"1"
		// 			game_id
		// 			:
		// 			"22"
		// 			game_pass
		// 			:
		// 			"10559"
		// 		}

		// 	*/
		// 	switch (message.notification.title) {
		// 		case 'move':
		// 			bus.emit('move', msg_data)
		// 			break
		// 		default: { // {} to allow `let`
		// 			let alert_text = 'Unknown firebase message received: '+JSON.stringify(message.notification)
		// 			alert(alert_text)
		// 			break
		// 		}
		// 	}
		// })

        provide('store',store)

        return {
        }
    },
})

function fcm_string_to_object(string) {

	string.replace('\"', '"')
	let object = JSON.parse(string)
	return object

}

let lo = function (to_log) {
	console.log(to_log)
}



</script>
