function instanceOf(left, right){
	let proto = left.__proto__
	let targetProto = right.prototype
	while (true){
		if (proto === null) return false
		if (proto === targetProto) return true
		proto = proto.__proto__
	}
}
