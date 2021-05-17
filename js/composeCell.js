const mixinA = {
	created(){
		console.log('A')
	}
}

const mixinB = {
	created(){
		console.log('B')
	}
}

function composeCell(...args){
	 return {
	 	  mixins: args,
		  created(){
	 	  	console.log('Base')
		  },
		  render(){
	 	  	return 'text'
		  }
	 }
}

const cell = composeCell(
	mixinA,
	mixinB
)
Vue.createApp(cell).mount('#app')
