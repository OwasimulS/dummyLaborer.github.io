import { ref, push, set, database, onValue, update } from "./firebase.js";
let serviceContainer = document.getElementById("serviceContainer");
let addBtn = document.getElementById("addBtn");
let inputName = document.getElementById("inputName");
let inputDesc = document.getElementById("inputDesc");
let submitBtn = document.getElementById("submitBtn");
//

//database ref
let serviceRef = ref(database, "services");

submitBtn.onclick = function (event) {
  event.preventDefault();
  serviceContainer.innerHTML = "";
  let service = {
    name: inputName.value,
    description: inputDesc.value,
  };
  let newServiceRef = push(serviceRef);
  set(newServiceRef, service);

  inputName.value = "";
  inputDesc.value = "";
};
onValue(serviceRef, (snapshot) => {
  serviceContainer.innerHTML = "";
  let data = snapshot.val();
  for (const property in data) {
    let newTitle = document.createElement("h2");
    let newDesc = document.createElement("p");
    let newService = document.createElement("div");
    let commentArea = document.createElement("div");
    let commentTitle = document.createElement("h3");
    let commentBtn = document.createElement("button");
    let inputCmtBox = document.createElement("input");
    let allCmtsDiv = document.createElement("div");
    //css style stuff
    commentTitle.innerHTML = "Comments:";
    commentBtn.innerHTML = "Add Comment";
    newService.style.backgroundColor = "#F2CB0C";
    newService.style.border = "7px solid white";
    newService.style.margin = "20px";
    newService.style.padding = "10px";

    inputCmtBox.id = property;
    commentBtn.onclick = function (event) {
      event.preventDefault();
      let cmtBoxVal = document.getElementById(property).value;
      let commentRef = ref(database, "services/" + property + "/" + "comments");
      let prevCmts;
      onValue(commentRef, (snapshot) => {
        prevCmts = snapshot.val();
        console.log(prevCmts);
      });
      if (prevCmts == null) {
        set(commentRef, [cmtBoxVal]);
      } else {
        set(commentRef, [...prevCmts, cmtBoxVal]);
      }
    };

    newTitle.innerHTML = data[property].name;
    newDesc.innerHTML = data[property].description;
    let allCmts = data[property].comments;
    if (allCmts != null) {
      for (let i = 0; i < allCmts.length; i++) {
        let newCmt = document.createElement("div");
        newCmt.style.marginTop = "10px";
        newCmt.innerHTML = allCmts[i];
        allCmtsDiv.append(newCmt);
      }
    }

    newService.append(newTitle);
    newService.append(newDesc);
    newService.append(commentArea);
    commentArea.append(commentTitle);
    commentArea.append(inputCmtBox);
    commentArea.append(commentBtn);
    commentArea.append(allCmtsDiv);
    serviceContainer.append(newService);
  }
});
