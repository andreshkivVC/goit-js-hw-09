const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),r=document.body;let d=null;t.addEventListener("click",(()=>{d=setInterval((()=>{r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),e.removeAttribute("disabled","true"),t.setAttribute("disabled","true")})),e.addEventListener("click",(()=>{clearInterval(d),e.setAttribute("disabled","true"),t.removeAttribute("disabled","true")}));
//# sourceMappingURL=01-color-switcher.1aa86b11.js.map
