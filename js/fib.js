
let memo = {
	1: 1,
	2: 1
}

// 1 1 2 3 5 8
function fib(n){
	if (n in memo) return memo[n]
	if (n === 1 || n === 2) return 1
	const res = fib(n - 1) + fib(n - 2)
	memo[n] = res
	return res
}


console.log(fib(45))
