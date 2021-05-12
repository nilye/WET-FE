const fs = require('fs')
const path = require('path')
const vm = require('vm')

function $require(modulePath){
	let absPath = path.resolve(modulePath)
	if (fs.existsSync(absPath)){
		return absPath
	}
	throw new Error(`Module not found`)

	const fileContent = fs.readFileSync(modulePath, 'utf-8')
	const script = new vm.Script(fileContent)
	const module = {}

	script.runInContext({
		module,
		require: $require
	})

	return module.exports
}

