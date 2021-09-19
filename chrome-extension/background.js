const local = (() => {

    let setToken = (key,obj) => {
        let values = JSON.stringify(obj);
        localStorage.setItem(key,values);
    }

    let getToken = () => {
        if(localStorage.getItem("tokendata")!= null)
        {
            return JSON.parse(localStorage.getItem("tokendata"));
        }else{
            return false;
        }
    }

    let updateToken = (key,newData)=>{
        if(localStorage.getItem(key) != null){
            let oldData = JSON.parse(localStorage.getItem(key));
            for(keyObj in newData){
                oldData[keyObj] = newData[keyObj];
            }
            let values = JSON.stringify(oldData);
            localStorage.setItem(key,values);
        }else{
            return false;
        }
    }

    return {set:setToken,get:getToken,update:updateToken}
})();

async function callCreateEvent(fetchUrl){
    let contests = await fetch(fetchUrl+"createEvents",{
        method:"POST",
        mode:"cors",
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(local.get())
    }).catch(err => console.log(err));

    contests = await contests.json();

    return contests;
}

let intervalId=null;

chrome.runtime.onMessage.addListener(async(req,sender,sendResponse) => {
    if(req.method === "isUserSignedIn"){
        if(local.get())
        {
            chrome.browserAction.setPopup({popup:'./popup_signedIn.html'});
            sendResponse("loggedIn");
        }
        else{
            chrome.browserAction.setPopup({popup:'./popup.html'});
            sendResponse("loggedOut");
        }
    }
    else if(req.method === "Initiate"){
        const contests=await callCreateEvent(req.message);
        console.log(contests);
        intervalId=setInterval(async()=>{
            if(!local.get())
                clearInterval(intervalId);
            const contests=await callCreateEvent(req.message);
            },24*60*60*1000);
        sendResponse({status:"Started"});
    }
    else if(req.method === "storeToken"){
        try{
            
            if(local.get())
                localStorage.removeItem("tokendata");
            let token = await fetch(req.message+"getToken",{
                method:"POST",
                mode:"cors",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(req.tokencode)
            })
            token = await token.json();
            local.set("tokendata",token);
            if(local.get())
            {
                chrome.browserAction.setPopup({popup:'./popup_signedIn.html'});
                sendResponse("Success");
            }
            else
                sendResponse("Failure");
        }catch (err){
            console.log(err);
        }
    }
    else if(req.method === "stop"){
        clearInterval(intervalId);
        sendResponse({status:"stopped"});
    }
    else if(req.method==="logout"){
        localStorage.removeItem("tokendata");
        if(!local.get())
        {
            chrome.browserAction.setPopup({popup:'./popup.html'});
            sendResponse("Success");
        }
    }
    return true;
})