const submit=document.getElementById("submit");

window.addEventListener("load",async() => {
    try{
        chrome.runtime.sendMessage({method: "isUserSignedIn"}, function(response) {
        if(response === "loggedIn")
            window.close();
      });}catch(err){
          console.log(err);
      }
});

const checkbox=document.getElementById("env");

let fetchUrl="https://codeforces-calendar.herokuapp.com/";
document.getElementById("signInAnchor").setAttribute("href",fetchUrl+"auth");

checkbox.addEventListener("change",(e)=> {
    fetchUrl=e.target.checked ? "http://localhost:8080/" : "https://codeforces-calendar.herokuapp.com/";
    document.getElementById("signInAnchor").setAttribute("href",fetchUrl+"auth");
});

submit.addEventListener("click",async(e)=>{
    try{
        e.preventDefault();
        let code = document.getElementById("tokencode").value;
            code = {
                tokencode:code
            }
        console.log(JSON.stringify(code));
        const check= await chrome.runtime.sendMessage({method: "storeToken", tokencode:code, message:fetchUrl}, function(response) {
            if(response === "Success")
                window.close();
        });
        if(check)
            window.close();
    }catch(err){
          console.log(err);
      }
})