const btn=document.getElementById("initiate");
const btnstop=document.getElementById("stop");
const logout=document.getElementById("logout");

window.addEventListener("load",async() => {
    try{
        chrome.runtime.sendMessage({method: "isUserSignedIn"}, function(response) {
            if(response === "loggedOut")
            window.close();
      });}catch(err){
          console.log(err);
      }
})

const checkbox=document.getElementById("env");

let fetchUrl="https://codeforces-calendar.herokuapp.com/";

checkbox.addEventListener("change",(e)=> {
    fetchUrl=e.target.checked ? "http://localhost:8080/" : "https://codeforces-calendar.herokuapp.com/";
});

btn.addEventListener("click",async(e) => {
    try{
        e.preventDefault();
        chrome.runtime.sendMessage({method: "Initiate", message:fetchUrl}, function(response) {
      });}catch(err){
          console.log(err);
      }
})

btnstop.addEventListener("click",async(e) => {
    try{
        e.preventDefault();
        chrome.runtime.sendMessage({method: "stop"}, function(response) {
      });}catch(err){
          console.log(err);
      }
})

logout.addEventListener("click",async(e) => {
    try{
        e.preventDefault();
        chrome.runtime.sendMessage({method: "logout"}, function(response) {
        if(response === "Success")
            window.close();
      });}catch(err){
          console.log(err);
      }
})