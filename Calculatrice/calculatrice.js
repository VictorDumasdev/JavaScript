var storage;
var edition=false;
var vupdown=false;

function rab(){
    
    var affi=document.getElementById("zone_affichage");
    affi.value="";
}

function calcul(){
    var affi=document.getElementById("zone_affichage");
    var cur=affi.value;
    try{
        affi.value=eval(cur);
    }
    catch(err){
        affi.value="error";
    }
}
function affiche(bouton){
    var signe=bouton.value;
    document.getElementById("zone_affichage").value+=signe;
}

function init(){
    setCookie("undefined","undefined",-1);
    var i;
    var bouton=document.getElementsByClassName('bouton_simple');
    for(i=0;i<bouton.length;i++){
        bouton[i].setAttribute("onclick","affiche(this)");
        
    }
    var libre=document.getElementsByClassName('bouton_libre');
    for(i=0;i<libre.length;i++){
        libre[i].value=getCookie(libre[i].id);
        if(getCookie(libre[i].id)=="")setCookie(libre[i].id,libre[i].value,-1);
    }

    
}

function plusmoins(){
    var affiS=document.getElementById("zone_affichage").value;
    if(affiS.startsWith("-")){
        var str=affiS.slice(1,affiS.length);
        document.getElementById("zone_affichage").value=str;
    }else{
        document.getElementById("zone_affichage").value="-"+document.getElementById("zone_affichage").value;
    }
}
function range_memory(){
    var pattern = new RegExp(/^-?\d+\.?\d*$/, 'igm');

    storage=document.getElementById("zone_affichage").value;
    if(storage.match(pattern)){
        console.log("storage : "+storage);
        document.getElementById("zone_affichage").value="";
    }else alert("You can't put that in memory");
    
}

function affiche_memory(){
    if(!(storage==="undefined"))document.getElementById("zone_affichage").value=document.getElementById("zone_affichage").value+storage;
}
function raz_memory(){
    storage="undefined";
    if(!(storage==="undefined"))console.log("bob");
    else console.log("undefined");
}
function mode_edition(){
    edition=true;
    document.getElementById("E").style.color = "red";
    document.getElementById("E").setAttribute("onclick","mode_calcul()");

    var bouton=document.getElementsByClassName("bouton_libre");
    for(var i=0;i<bouton.length;i++){
        bouton[i].removeAttribute("onclick");
        bouton[i].setAttribute("ondblclick","edit(this)");
    }
}
function mode_calcul(){
    edition=false;
    document.getElementById("E").style.color = "black";
    document.getElementById("E").setAttribute("onclick","mode_edition()");

    var bouton=document.getElementsByClassName("bouton_libre");
    for(var i=0;i<bouton.length;i++){
        bouton[i].removeAttribute("ondblclick");
        bouton[i].setAttribute("onclick","affiche(this)");
        bouton[i].setAttribute("type","button");
        bouton[i].removeAttribute("onblur");
    }
}
function edit(bouton){
    bouton.setAttribute("type","text");
    bouton.setAttribute("ondblclick","fix(this)");
    bouton.setAttribute("onblur","save(this)");
}
function fix(bouton){
    bouton.setAttribute("type","button");
    bouton.setAttribute("ondblclick","edit(this)");
    save(this);
    bouton.removeAttribute("onblur");
}

function updown(){
    var affi=document.getElementById("ligne_affichage");
    var calc=document.getElementById("calc");
    var deplace=calc.removeChild(affi);
  if(!vupdown)
  {
    calc.appendChild(deplace);
    vupdown=true;
  }
  else {
    calc.prepend(deplace);
    vupdown=false;
  }
}

function save(button){
    console.log(button.id+" et "+button.value);
    setCookie(button.id,button.value,2);
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

// DRAG AND DROP

  document.addEventListener("dragstart", function(event) {
    // The dataTransfer.setData() method sets the data type and the value of the dragged data
    event.dataTransfer.setData("Text", event.target.id);
    
    // Output some text when starting to drag the p element
    document.getElementById("pDrag").innerHTML = "Started to drag the p element.";
    
    // Change the opacity of the draggable element
    event.target.style.opacity = "0.4";
  });
  
  // Output some text when finished dragging the p element and reset the opacity
  document.addEventListener("dragend", function(event) {
    document.getElementById("pDrag").innerHTML = "Finished dragging the p element.";
    event.target.style.opacity = "1";
  });

  // By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
  document.addEventListener("dragover", function(event) {
    event.preventDefault();
  });
  
  /* On drop - Prevent the browser default handling of the data (default is open as link on drop)
     Reset the color of the output text and DIV's border color
     Get the dragged data with the dataTransfer.getData() method
     The dragged data is the id of the dragged element ("drag1")
     Append the dragged element into the drop element
  */
 // Pour dropper directement dans le champ texte
  /*document.addEventListener("drop", function(event) {
    event.preventDefault();
    if ( event.target.id=="zone_affichage") {
        var data = event.dataTransfer.getData("Text");
        event.target.value+=document.getElementById(data).innerText;
        
    }
  });*/
  document.addEventListener("drop", function(event) {
    event.preventDefault();
    if ( event.target.id.startsWith("libre")) {
        var data = event.dataTransfer.getData("Text");
        event.target.value=document.getElementById(data).innerText;
        
    }
  });