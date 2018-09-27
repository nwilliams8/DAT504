
let username = prompt("Username",'')

if (username == "Admin"){
	let password = prompt("Password",'')
    if (password == "Password"){
    	prompt("Welcome!")
      }
     else if (password == null){
     	prompt("Cancelled")
      }
      else{
      	prompt("Wrong Password")
      }
		}
else if (username == null){
	prompt("Cancelled")
   	}
else {
	prompt("Invalid")
   }
