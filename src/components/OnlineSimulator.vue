<template>
	<!-- Example FCM messages at bottom  -->
	<div id="online_simulator">
		<h2>
			Simulate online player
		</h2>
		<h3>
			FCM move
		</h3>
		<div id="online_simulator">
			<p>
				<button @click="fcm_move('74to64')">
					7-4 ↑ 6-4 [from start]
				</button>
			</p>
			<p>
				<button @click="fcm_move('64to74')">
					6-4 ↓ 7-4
				</button>
			</p>
		</div>
		<h3>
			Direct move (not via FCM)
		</h3>
		<div id="online_simulator">
			<p>
				<button @click="direct_move_2('74to64')">
					7-4 ↑ 6-4 [from start]
				</button>
			</p>
			<p>
				<button @click="direct_move_2('64to74')">
					6-4 ↓ 7-4
				</button>
			</p>
		</div>
		<!--
		<h3>
			Alt Direct move (not via FCM)
		</h3>
		<div id="online_simulator">
			<p>
				<button @click="direct_move_test('74to64')">
					7-4 ↑ 6-4 [from start]
				</button>
			</p>
			<p>
				<button @click="direct_move_test('64to74')">
					6-4 ↓ 7-4
				</button>
			</p>
		</div>
		<h3>
			Direct move (not via FCM)
		</h3>
		<div id="online_simulator">
			<p>
				<button @click="receive_move(6,1,5,1)">
					6-1 ↑ 5-1 [from start]
				</button>
			</p>
			<p>
				<button @click="receive_move(5,1,6,1)">
					5-1 ↓ 6-1
				</button>
			</p>
			<p>
				<button @click="receive_move(7,4,6,4)">
					7-4 ↑ 6-4 [from start]
				</button>
			</p>
			<p>
				<button @click="receive_move(6,4,7,4)">
					6-4 ↓ 7-4
				</button>
			</p>
		</div>
		-->
		<p>
			<button @click="log_sotw">
				Log SOTW
			</button>
		</p>
	</div>
</template>

<script>

import bus from 'src/supplements/bus.js'
import _64to74 from 'src/components/OnlineSimulator/64to74'
import _74to64 from 'src/components/OnlineSimulator/74to64'

let l = function (to_log) {
  console.log(to_log)
  }

let lo = l

export default {
	name: 'OnlineSimulator',
	methods: {

		receive_move(from_row, from_col, to_row, to_col) {
			let move_info = {
				inspiration: false,
				piece: {
					from_row:	from_row,
					from_col:	from_col,
					to_row:		to_row,
					to_col:		to_col,
					type:		'mortal',
					side:		2
				},
				meta: {
					turn:			5,
					current_player: 1
				}
			}
			bus.emit('move', move_info)
		},

		fcm_move(move) {
			// 1) Without updating SOTW in our GameWorld, simulate the other player updating it
			if (move === '64to74') {
				this.send_turn(_64to74)
			} else if (move === '74to64') {
				this.send_turn(_74to64)
			}

			// 2) Send the FCM message, just like GodCloud currently sends it

			bus.emit('move', {"game_id": 22, "game_pass": 10559, "current_player":	1})

		},

		send_turn(sotw) {

			var server_request = new XMLHttpRequest()

			let get_url = 'http://gods.philosofiles.com/godcloud/?action=update&game=22&pw=10559&turn=3&current_player=1&winner=null&win_type=null&sotw='+JSON.stringify(sotw);

			lo(get_url)

			server_request.open("GET", get_url, false) // false = synchronous
			server_request.send()
			lo('response to ?update:')
			lo(server_request.responseText)

		},

		direct_move_2(move) {

			if (move === '64to74') {
				lo('_var to emit=')
				lo(_64to74)
				bus.emit('update_received', _64to74)
			} else if (move === '74to64') {
				lo('_var to emit=')
				lo(_74to64)
				bus.emit('update_received', _74to64)
			}

		},

		direct_move_test(move) {

			if (move === '64to74') {
				lo('_var to emit=')
				lo(_64to74)
				bus.emit('update_received', _64to74)
			} else if (move === '74to64') {
				lo('_var to emit=')
				lo(_74to64)
				bus.emit('update_received', _74to64)
			}

		},

		log_sotw() {
			bus.emit('log_sotw')
		}

	},
	created() {
		bus.on('test_move_arrow', () => {
			this.receive_move(0);
		})
	}
}



/*
could add:
<div id="tests">
<FirebaseTest/>
</div>

*/
</script>

<style>

</style>
