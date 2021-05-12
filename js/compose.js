function isNotNull(v){
	return v != null
}

function isObject(v){
	return typeof v === 'object'
}

function noModifiedPrototype(v){
	return v.__proto__ === Object.prototype
}

function compose(...args){
	return function(value){
		for (let i = args.length - 1; i >= 0; i--){
			const res = args[i](value)
			if (!res) return false
		}
		return true
	}
}

const isPlainObject = compose(
	noModifiedPrototype,
	isObject,
	isNotNull
)

console.log(isPlainObject({}))
console.log(isPlainObject(new Date()))
console.log(isPlainObject(1))
