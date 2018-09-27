let input1 = prompt("enter a number", 0)
let input2 = prompt("enter another number", 0)

function compare (input1, input2){
  if (input1 > input2){
    prompt(input1 + " was the bigger number")
  }
  else if (input2 > input1){
    prompt(input2 + " was the bigger number")
  }
  else{
    prompt("Both numbers were the same")
  }
}
