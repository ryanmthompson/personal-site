var navBit = false;
function toggleNav() {
    if(navBit === false){
        openNav();
    }else if(navBit === true){
        closeNav();
    }
    navBit = !navBit;
}
function openNav() {
    document.getElementById("myHomeSidenav").style.width = "250px";
    document.getElementById("homeMain").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("myHomeSidenav").style.width = "0";
    document.getElementById("homeMain").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}