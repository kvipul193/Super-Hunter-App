
let favContainer = document.querySelector('.fav-container');

let keys=Object.keys(sessionStorage);
favContainer.innerHTML ='';
  if(keys[0] === 'IsThisFirstTime_Log_From_LiveServer'){
    keys.shift();
  }
   if(keys.length<1){
    favContainer.innerHTML =`<div class="card-fav-container"  > 
      <h2 style="text-align:center; color: white;margin:auto"> No Items Added in Favourite list</h2>
    </div>`
   }
   else{
    keys.forEach((key)=>{
    let obj=JSON.parse(sessionStorage.getItem(key));

    favContainer.innerHTML += `<div class="card-fav-container" id=${obj.id} >
        <div class="container-character-image" >
        <img src=${obj.imgUrl} />
        </div>
        <div class="character-name">${obj.name}</div>
        <div class="character-description">${obj.description}</div>
        <button class="btn btn-primary fav" id=remove onclick = removeItemFromFavourite(${obj.id})>Remove</button>
        </div>;`
    
  })
}
    const removeItemFromFavourite= (parentId)=>{

     console.log(parentId)
     sessionStorage.removeItem(parentId);
    location.reload();
  }
   
 document.getElementById('clear').onclick =()=>{
    sessionStorage.clear();
    location.reload()
 }