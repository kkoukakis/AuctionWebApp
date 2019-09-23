window.globalServer = 'localhost:3030/';
export const server = 'http://192.168.137.1:3030/';
//var server = 'http://localhost:3030/';

export function changebackground (color) {
    document.body.style.backgroundColor = color;
   var page =  document.querySelector('html') ;
   page.style.backgroundColor = color;
}
