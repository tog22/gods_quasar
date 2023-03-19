<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container    >
            <router-view    />
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent, inject } from 'vue';
import bus from '../supplements/bus'

/******************
** Firebase load */

// For capacitor-firebase:
import { initializeApp } from 'firebase/app';
import {
  FirebaseMessaging,
//   GetTokenOptions,
//   Notification,
} from '@capacitor-firebase/messaging';

// For firebase 8+:
// import firebase from 'firebase'
// For firebase 9+:
// import firebase from 'firebase/compat/app'

export default defineComponent({
    name: 'MainLayout',
    setup () {

		const store_parent = inject("store")
		let store = store_parent.state

        ////////////////
        //    FIREBASE    //
        //    Create firebase messaging in app, in addition to service worker

        const firebaseConfig = {
			apiKey: "AIzaSyBGhSRGXLRM1m-nNMFNuJnSKu5AX--6vb0",
			authDomain: "godsgamefbase.firebaseapp.com",
			projectId: "godsgamefbase",
			storageBucket: "godsgamefbase.appspot.com",
			messagingSenderId: "306649763697",
			appId: "1:306649763697:web:228785d43cabe34913b0d0",
			vapidKey: "BACyAFjs1KoHzgCkmXllHlmBBqj6yLbxcJSD4wjxjN-bJKl6zaWSevcaxkanK0RD05GJrPK-1yHodls6kGoaf4w"
		};

		// firebase.initializeApp(firebaseConfig);
		initializeApp(firebaseConfig)

		FirebaseMessaging.removeAllListeners().then(() => {
			FirebaseMessaging.addListener('tokenReceived', (message) => {
				console.log(`tokenReceived`, { message });
			});
			FirebaseMessaging.addListener('notificationReceived', (message) => {
				console.log(`notificationReceived`, { message });
				console.log('📨 Message received')
					console.log(message)
					let msg_data = message.notification.data
					/* Example message to send:

						title:
						Move

						body:
						"It's your turn"

						data:
						{
							current_player:
							"1"
							game_id
							:
							"22"
							game_pass
							:
							"10559"
						}

					*/
					switch (message.notification.title) {
						case 'move':
							bus.emit('move', msg_data)
							break
						default: { // {} to allow `let`
							let alert_text = 'Unknown firebase message received: '+JSON.stringify(message.notification)
							alert(alert_text)
							break
						}
					}
			});
			FirebaseMessaging.addListener('notificationActionPerformed', (message) => {
				console.log(`notificationActionPerformed`, { message });
			});
		});
		
		// let firebase_messaging = firebase.messaging()
		let firebase_messaging = FirebaseMessaging
		// lo(firebase_messaging)
		// console.log('Firebase cloud messaging object', firebase_messaging)

		let get_token = firebase_messaging.getToken({vapidKey: "BACyAFjs1KoHzgCkmXllHlmBBqj6yLbxcJSD4wjxjN-bJKl6zaWSevcaxkanK0RD05GJrPK-1yHodls6kGoaf4w"})

		get_token.then(
			function (result) {
				
				store.token = result.token

				lo('FCM registration token:')
				lo(result.token)
				
				if (store.logged_in) {
					var server_request = new XMLHttpRequest()

					let get_url = 'http://godcloud.philosofiles.com/?action=report_token&token='+result.token+'&user='+store.user;
					lo(get_url);

					server_request.open("GET", get_url, false) // false = synchronous
					server_request.send()
				}

			},
			function (error) {
				lo('err getting token')
			}
		);

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
