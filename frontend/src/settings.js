
var local = false;
export const server = ((local === false) ? 'http://192.168.43.31:3030/' : 'http://localhost:3030/');

export function changebackground (color) {
    document.body.style.backgroundColor = color;
   var page =  document.querySelector('html') ;
   page.style.backgroundColor = color;
}
