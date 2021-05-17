Function.prototype._call = function (ctx, ...args){
	const nonce = Symbol('_call')
	ctx[nonce] = this
	let res = ctx[nonce](...args)
	delete ctx[nonce]
	return res
}

Function.prototype._bind = function(ctx, ...args1){
	const fn = this
	return function(...args2){
	 	  return fn._call(ctx, ...args1.concat(args2))
	 }
}

function sum(a){
	console.log(a + this.b)
}

const addTen = sum._bind({b: 10})
console.log(addTen(1))
