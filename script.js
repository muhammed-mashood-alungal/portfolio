document.getElementById("form").addEventListener("submit",(e)=>{
 
    e.preventDefault()
    const form = document.getElementById("form");
    const result = document.getElementById("result");
    var name=document.getElementById("name").value
    var email=document.getElementById("email").value
    var msg=document.getElementById("message").value
   
    
     if(name.trim() == ""){
       alert("add name")
       return false
     }
     if(email.trim() == ""){
        alert("Add Email")
        return false
     }
     if(msg.trim() == ""){
        alert("Add Message")
        return false
     }

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){
           alert("Please enter a valid email")
           return false
        }
      
        const formData = new FormData(form);
          const object = Object.fromEntries(formData);
          const json = JSON.stringify(object);
          result.innerHTML = "Please wait...";

          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: json,
          }).then(async (response) => {
              let json = await response.json();
              if (response.status == 200) {
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-green-500");
              } else {
                console.log(response);
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-red-500");
              }
            })
            .catch((error) => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
            })
    
})

