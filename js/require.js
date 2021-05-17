const fs = require('fs')
const path = require('path')
const vm = require('vm')

function $require(modulePath){
	let absPath = path.resolve(modulePath)
	if (!fs.existsSync(absPath)){
		throw new Error(`Module not found`)
	}

	const fileContent = fs.readFileSync(modulePath, 'utf-8')
	const script = new vm.Script(fileContent)
	const ctx = { module: {}}
	vm.createContext(ctx)
	script.runInContext(ctx)

	return ctx.module.exports
}

const b = $require('./b.js')
console.log(b)
