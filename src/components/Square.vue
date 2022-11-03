<template>
	<td :class="square_class" v-on:click="click">
		<div>
			<span v-html="occupant_image">
			</span>
		</div>
	</td>
</template>
<script>
	import bus from 'src/supplements/bus.js'

	export default {
		props: {
			square: {
				type: Object,
				default: null
			},
			row: {
				type: Number,
				default: null
			},
			col: {
				type: Number,
				default: null
			},
			is_selected: {
				type: String,
				default: ''
			}
		},
		data() {
			
			let occupant_image = ''
			if (this.square.side === 1 & this.square.occupant === 'mortal') {
				occupant_image = '<img class="oi" src="/images/monk_blue.png" />'
			} else if (this.square.side === 1 & this.square.occupant === 'angel') {
				occupant_image = '<img class="oi" src="/images/prophet_blue.png" />'
			} else if (this.square.side === 2 & this.square.occupant === 'mortal') {
				occupant_image = '<img class="oi" src="/images/monk_red.png" />'
			} else if (this.square.side === 2 & this.square.occupant === 'angel') {
				occupant_image = '<img class="oi" src="/images/prophet_red.png" />'
			}
			return {
				occupant_image: 	occupant_image
			};
		},
		computed: {
			square_class: function() {
				let ret = '';
				if (this.square.divinely_inspired) {
					ret += ' divinely_inspired ';
				}
				if (this.is_selected) {
					ret += ' selected ';
				}
				return ret;
			},
			occupant_class: function() {
				let ret = '';
				switch (this.square.side) {
					case 1:
						ret = ' baboon ';
						break;
					case 2:
						ret = ' hippo ';
						break;
				}
				switch (this.square.occupant) {
					case 'mortal':
						ret += ' mortal ';
						break;
					case 'angel':
						ret += ' angel ';
						break;
				}
				return ret;
			},
		},
		methods: {
			click: function() {
				this.$emit('square_click_emission', this.row, this.col);
			}
		},
		mounted() {

		}
	};

	/* baboon/hippo version
    export default {
		props: {
			square: {
				type: Object,
				default: null
			},
			row: {
				type: Number,
				default: null
			},
			col: {
				type: Number,
				default: null
			},
			is_selected: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
			};
		},
		computed: {
			square_class: function() {
				let ret = '';
				if (this.square.divinely_inspired) {
					ret += ' divinely_inspired ';
				}
				if (this.is_selected) {
					ret += ' selected ';
				}
				return ret;
			},
			occupant_class: function() {
				let ret = '';
				switch (this.square.side) {
					case 1:
						ret = ' baboon ';
						break;
					case 2:
						ret = ' hippo ';
						break;
				}
				switch (this.square.occupant) {
					case 'mortal':
						ret += ' mortal ';
						break;
					case 'angel':
						ret += ' angel ';
						break;
				}
				return ret;
			},
			occupant_image: function() {
				let ret = '';
				switch (this.square.side) {
					case 1:
						ret = '🐒';
						break;
					case 2:
						ret = '🦛';
						break;
				}
				return ret;
			}
		},
		methods: {
			click: function() {
				this.$emit('square_click_emission', this.row, this.col);
			}
		},
		mounted() {

		}
	};

	*/
</script>
