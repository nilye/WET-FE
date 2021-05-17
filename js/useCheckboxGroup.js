/**
 * 创建一个 CheckboxGroup 对象，其符合以下规范：
 *
 *   1. 为一个 <key， value> 对象， 且 value 只能是 Boolean
 *   2. 此对象上有 `all` 属性，且会根据其他传参的变化来合计 `all`的值
 *     - true:  “全选状态” 所有属性全 true
 *     - false: “全非状态” 所有属性全 false
 *     - null:  "待定状态" 包含至少一个 true 和 一个 false 属性 （indeterminate）
 *
 *   3. `all` 属性不可被枚举,
 *   4. `all` 属性的值 可以被 “赋值运算符” 改变， 且更改之后 其他属性也要相应置为 true/false
 *   5. 没有其他属性时， `all` 为 false
 *   6. CheckboxGroup 需要是一个 vue 响应式对象， 可被 watch, computed, render 监听变化
 *
 */
function useCheckboxGroup(defaultValue) {

	// 计数器， 用于合计 all
	const counter = {
		checked: 0,
		size: 0
	}

	// raw 对象
	const rawObj = {}
	Object.defineProperty(rawObj, 'all', {
		enumerable: false,
		writable: true,
		configurable: false
	})

	// 代理对象
	let groupRef = new Proxy(rawObj, {
		set: set.bind(this, counter),
		deleteProperty: deleteProperty.bind(this, counter)
	})

	// 赋默认值
	if (typeof defaultValue === 'object'){
		for (let key in defaultValue) {
			groupRef[key] = Boolean(defaultValue[key])
		}
	} else {
		rawObj.all = false
	}

	return groupRef
}

// setter
function set(counter, target, key, value) {
	value = Boolean(value)

	// 如果没有变化 不予set
	if (target[key] == value){
		return true
	}

	// 取值 all
	if (key === 'all') {
		Object.keys(target).forEach(k => {
			if (target[k] != value) {
				target[k] = value
			}
		})
		if (value){
			counter.checked = counter.size
		} else {
			counter.checked = 0
		}
		return Reflect.set(target, key, value)
	}

	// 取值项
	// set op
	if (key in target) {
		counter.checked += value ? 1 : -1
	}
	// add op
	else {
		counter.size++
		counter.checked += value ? 1 : 0
	}

	target.all = aggregate(counter)
	return Reflect.set(target, key, value)
}

// 删除项
function deleteProperty(counter, target, key) {
	let value = target[key]
	counter.size--
	counter.checked -= value ? 1 : 0
	target.all = aggregate(counter)
	return Reflect.deleteProperty(target, key)
}

/**
 * 合计 all 的结果
 */
function aggregate(counter) {
	if (counter.checked === 0) return false
	if (counter.checked === counter.size) return true
	return null
}
