

let menu = document.getElementsByClassName('menu')[0];
let sidebar = document.getElementsByClassName('sidebar')[0];
menu.addEventListener('click',()=>{
  sidebar.classList.toggle('cerrar');
  menu.classList.toggle('activo')
  
})