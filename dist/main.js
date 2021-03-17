!function(){"use strict";var e=(()=>{const e=firebase.database().ref("lists"),t=e=>{const t=document.createElement("button");t.setAttribute("id",e+"-list"),t.className="list-item";const n=document.createElement("span");n.innerHTML=e;let i=document.createElement("div");i.className="list-title",i.appendChild(n),t.appendChild(i);let l=document.createElement("div");l.className="delete-button",t.appendChild(l);let s=document.createElement("a"),d=document.createElement("img");return d.src="../dist/imgs/close-icon.png",d.className="delete-icon",d.id="delete-"+e+"-list",l.appendChild(d),d.parentNode.insertBefore(s,d),t.appendChild(l),t},n=e=>{document.querySelector(".lists").appendChild(e)},i=e=>{e.childNodes[1].addEventListener("click",(()=>{e.remove()}))};return{createListContainer:t,appendListContainerToLists:n,addListToDatabse:t=>{e.child(t+"-list").set({list_name:t,list_objects:{}})},addDeleteFeature:i,renderExistingLists:()=>{e.orderByKey().on("value",(e=>{e.forEach((e=>{let l=t(e.val().list_name);n(l),i(l)}))}))}}})(),t=(()=>{let t=!1;const n=document.querySelector(".list-popup"),i=document.getElementById("list-name");return{openPopupWindow:()=>{document.querySelector(".add-list-item").addEventListener("click",(()=>{n.style.display="flex"})),t=!0},closePopupWindow:()=>{document.querySelector(".cancel-list").addEventListener("click",(()=>{n.style.display="none"})),t=!1},addListItem:()=>{document.querySelector(".add-list").addEventListener("click",(()=>{if(i.value.length>0){e.addListToDatabse(i.value);let t=e.createListContainer(i.value);e.appendListContainerToLists(t),e.addDeleteFeature(t),i.value=null}else i.value.length<1&&(i.id="list-name-invalid",setInterval((()=>{i.id="list-name"}),800))}))}}})();t.openPopupWindow(),t.closePopupWindow(),t.addListItem(),e.renderExistingLists()}();