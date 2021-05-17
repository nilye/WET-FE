function instanceOf(left, right){
	let proto = left.__proto__
	let targetProto = right.prototype
	while (proto){
		if (proto === targetProto) return true
		proto = proto.__proto__
	}
	return false
}


console.log(instanceOf(new Date(), String))
