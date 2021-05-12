function curry(fn){
	return function curried(){
		let args = Array.prototype.slice.call(arguments)
		if (args.length >= fn.length){
			return fn.apply(this, args)
		}
		return function(...args2){
			return curried.apply(this, args.concat(args2))
		}
	}
}
