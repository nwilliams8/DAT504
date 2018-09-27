function pow(x,y){
  let result = x;

  for (let i = 1; i<n; i ++){
    result = result * x;
  }
  return result
}

let x = prompt("x?", '');
let n = prompt("n?", '');

if (n<1){
  alert("Enter a number Greater than 1")
} else {
  alert(pow(x,n));
}
