let mult = function(a,b){
    return a*b;
}
let sum = function(a,b){
    return a+b;
}
let doSomething = async function(a,b,c){
    let d = sum(mult(a,b),10);
    let e = mult(a,mult(c,-1));
    return sum(d,e,a);
}
console.log(doSomething(4,5,3,2));