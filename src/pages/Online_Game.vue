<template>
<q-page>
	<div id="app">
        <div class="game_world_root mob_style dev" ><!-- :class="[game_type, which_screen]" -->
            <div id="pnp_game" class="screen">
                <div class="menu_bar">
                    <div class="s_left">
                        <span class="back"><!-- todo: add @click -->
                            ⬅️
                        </span>
                    </div>
                    <div class="s_middle">
                        <h1>
                            Path of the Gods
                        </h1>
                    </div>
                    <div class="s_right">
                    </div>
                </div>
                <GameWorld :online_screen="1" :online="online" />
            </div>
        </div>
        <!-- <OnlineSimulator/> -->
    </div>
</q-page>
</template>

<script>
/* eslint-disable */
import { defineComponent, inject } from "vue";
import bus from 'src/supplements/bus.js'

import GameWorld from 'src/components/GameWorld.vue'
import OnlineSimulator from 'src/components/OnlineSimulator.vue'



export default defineComponent({
	name: "Online_Game",
	components: {
        GameWorld,
        OnlineSimulator
	},
	setup() {
		const store = inject("store");
		return {
			store,
		};
  },
  created() {

  },
  data() {
    return {
        online: {
            user: 'Tomek', // Tomek/logging_in/etc
            userpass: 'pass',
            game_id: 22,
            game_pass: 10559,
            side: 1,
            // game_id: null,
            // game_pass: null,
            // side: null,
            subscreen: 'user menu', // default = 'user menu'
            error: '',
            login_error: null,
            signup_error: null,
            has_current_games: true, // todo, low: set
            games: [
                /*
                {
                    opponent: 'Mel',
                    id: 21,
                    game_pass: 21449,
                    side: 1
                }
                */
            ]
        }
    }
  }
});

let l = function (to_log) {
  console.log(to_log)
}
let lo = l

</script>
