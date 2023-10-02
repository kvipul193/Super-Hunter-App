
let MD5 = require ("crypto-js/md5"); //Import MD5


// select all the required elements
let input =document.getElementById('input-box');
let button = document.getElementById('submit-button');
let showContainer =document.getElementById('show-container');
let listContainer = document.querySelector('.list');

//Generate  timeStamp
const date= new Date();
console.log(date.getTime());
let timeStamp= date.getTime();
let apiKey= "9f75fe299da4faddc29d126fa50c6884"; //public key
let privateKey ="4d500da032b7ebd2a4be048866e0d32472420c1b";

//Genrate Hash value using crypto-js/md5 module
let hashValue =MD5(timeStamp+privateKey+apiKey)


function removeElements(){
    listContainer.innerHTML = "";
}

//Add event on keyup in input search bar to fetch hero Start with user input value and add it to list container
input.addEventListener('keyup', async()=>{
    removeElements();
    if(input.value.length < 4){
         return false;
    }
    const url =`https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

    const response = await fetch(url);
    const jsonData= await response.json();
    jsonData.data["results"].forEach((result)=>{
        let name = result.name;
        
        let div =document.createElement("div")
        div.style.cursor ="pointer";
        div.classList.add("autocomplete-items");
        // div.setAttribute("onclick", displayWords('"+ name + "'));
        div.onclick=()=>{
            input.value=name;
            listContainer.innerHTML=""
        }
        let word = "<b>" + name.substr(0,input.value.length) +"</b>"
        word += name.substr(input.value.length+1);
        div.innerHTML = `<p class ="item"> ${word}</p>`;
        listContainer.appendChild(div);
    })
})

// program to display searched reult as per input invalue starts here

button.addEventListener("click",(getResult = async ()=>{
    if(input.value.trim().length <1){
        alert("Input can not be blank")
    }
    showContainer.innerHTML= ``;
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;
  
    const response = await fetch(url);
    console.log(response)
    const jsonData =await response.json();
    jsonData.data["results"].forEach((element) =>{
        
        showContainer.innerHTML = `<div class="card-container" id=${element.id}>
        <div class="container-character-image" >
        <img src=${element.thumbnail["path"] +"." + element.thumbnail["extension"]} />
        </div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
        <button class="btn btn-primary fav" id="fav"  >Add to Favourite</button>
        </div>;`
    })
    // program to display searched reult as per input invalue ends here


    // program to add item in favourite 
    document.getElementById('fav').onclick=(event)=>{
        console.log(event.target.parentElement.id)
        let parentId=event.target.parentElement.id
        console.log(jsonData.data['results'][0].name)
        let favObj = {
                    id:parentId,
                    name: jsonData.data['results'][0].name,
                    description: jsonData.data['results'][0].description,
                    imgUrl: jsonData.data['results'][0].thumbnail['path'] +"." + jsonData.data['results'][0].thumbnail['extension']
            }
        sessionStorage.setItem(parentId,JSON.stringify(favObj));
        
    }
}))




window.onload =()=>{
 getResult();
}

