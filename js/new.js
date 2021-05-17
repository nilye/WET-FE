function _new(fn){
	let ctx = {}
	if (fn.prototype){
		ctx.__proto__ = ctx.prototype
	}
	const res = fn.apply(ctx, Array.prototype.slice.call(arguments))
	if (res && typeof res === 'object'){
		return res
	}
	return ctx
}

function Lisa(){
	this.beautiful = true
}

console.log(new Lisa())
console.log(_new(Lisa))
