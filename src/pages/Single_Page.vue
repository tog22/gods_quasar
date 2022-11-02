<template>
<q-page>
	<div id="app">
        <Interface/>
        <OnlineSimulator/>
    </div>
</q-page>
</template>

<script>
/* eslint-disable */
import { defineComponent, inject } from "vue";
import bus from 'src/supplements/bus.js'

import Interface from 'src/components/Interface.vue'
import OnlineSimulator from 'src/components/OnlineSimulator.vue'



export default defineComponent({
	name: "Single_Page_App",
	components: {
        Interface,
        OnlineSimulator
	},
	setup() {
		const store = inject("store");
		return {
			store,
		};
  },
  created() {

  }
});

let l = function (to_log) {
  console.log(to_log)
}
let lo = l

</script>
