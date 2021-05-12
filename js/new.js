function $new(fn){
	let ctx = new Object({})
	if (fn.prototype){
		ctx.__proto__ = ctx.prototype
	}
	const res = fn.apply(ctx, Array.prototype.slice.call(arguments))
	if (res && typeof res === 'object'){
		return res
	}
	return ctx
}

