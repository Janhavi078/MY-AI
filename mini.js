let prompt = document.querySelector("#prompt")
let container = document.querySelector(".container")
let imagebtn  = document.querySelector("#image")
let image  = document.querySelector("#image img")
let imageinput  = document.querySelector("#image input")


const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBGnA2N2FDJz9lzGgox9F4TW2wx3Lbu1sE"
let user = {
    message:null,
    file:{
        mime_type:null,
          data: null
    }
    
}

async function generateResponse(aiChatBox) {

    let text = aiChatBox.querySelector(".ai-chatArea")
    let RequestOption={
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body : JSON.stringify({
      "contents": [
        {"parts":[{text: user.message},(user.file.data?[{"inline_data" : user.file}] : [])

        ]
        }]
       })
    }
    try{
        let response= await fetch(Api_Url,RequestOption)
        let Data=await response.json()
        let apiResponse=Data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
        text.innerHTML=apiResponse

        
    }
    catch(error){
        console.log(error);
        
    }
    finally{
        container.scrollTo({top:container.scrollHeight,behavior:"smooth"})
image.src=`img.svg`
        image.classList.add("choose")
        user.file={}

    }




}
function createChatBox(html,classes){
    let div=document.createElement("div")
    div.innerHTML=html
    div.classList.add(classes)
    return div
}

function handlechatResponse(userMessage){
   user.message=userMessage
    let html=`<img src="https://static.turbosquid.com/Preview/2015/07/01__07_00_44/d00.jpg51979e6b-755c-4f03-9a16-d8114f0e2058Original.jpg" alt="" id="userImage" width="50">
        <div class="user-chatArea">
        ${user.message}
        ${user.file.Data?`<img src="data:${user.file.mime_type};base64,${user.
            file.data}" class="chooseimg" /> ` : ""}
        </div>`
        prompt.value=""
        let userChatBox = createChatBox(html,"user-chat-box")
        container.appendChild(userChatBox)

        container.scrollTo({top:container.scrollHeight,behavior:"smooth"})

        setTimeout(()=>{
        let html=`<img src="https://as2.ftcdn.net/v2/jpg/05/65/06/85/1000_F_565068563_jSzYovhlcrwcVTOm05akpqVdZXdoOaNE.jpg" 
              alt="" id="aiImage" width="60">
            <div class="ai-chatArea">
                <img src="https://c.tenor.com/ofRPnrDi9SQAAAAC/loading.gif" alt="" class="load" width="50px">
            </div>`
            let aiChatBox=createChatBox(html,"ai-chat-box")
            container.appendChild(aiChatBox)
            generateResponse(aiChatBox)
        },600)
}


prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        handlechatResponse(prompt.value)
    }

    
    
})
imageinput.addEventListener("change",()=>{
    const file=imageinput.files[0]
    if(!file) return
    let reader=new FileReader()
    reader.onload=(e)=>{
        let base64string=e.target.result.split(",")[1]

            user.file={
                mime_type: file.type,
                  data: base64string
            }
        image.src=`data:${user.file.mime_type};base64,${user.
        file.data}`
        image.classList.add("choose")
        
    }
    
    reader.readAsDataURL(file)
})
imagebtn.addEventListener("click",()=>{

    imagebtn.querySelector("input").click()
})

var loader = document.querySelector("#loader");
setTimeout(function(){
    loader.style.top = "-100%"
},4000)