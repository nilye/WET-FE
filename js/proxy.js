let xiangjun = {hair: 'a lot & long'}

let proxied = new Proxy(xiangjun, {
	get(...args){
		console.log('**', ...args)

		// renderer

		return Reflect.get(...args)
	},
	 set(){

	 }


})

console.log(proxied.hair)
