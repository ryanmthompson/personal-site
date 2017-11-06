function SideNav() {
    this.leftNavBit = false;
    this.rightNavBit = false;
    this.toggleNav = function(side) {
        if(side === "left"){
            if(this.leftNavBit === false){
                this.openLeftNav();
            }else if(this.leftNavBit === true){
                this.closeLeftNav();
            }
            this.leftNavBit = !this.leftNavBit;
        }else if(side === "right"){
            if(this.rightNavBit === false){
                this.openRightNav();
            }else if(this.rightNavBit === true){
                this.closeRightNav();
            }
            this.rightNavBit = !this.rightNavBit;
        }
    };
    this.openLeftNav = function() {
        document.getElementById("myLeftSidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    };
    this.closeLeftNav = function() {
        document.getElementById("myLeftSidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
        document.body.style.backgroundColor = "white";
    };
    this.openRightNav = function() {
        document.getElementById("myRightSidenav").style.width = "250px";
        document.getElementById("main").style.marginRight = "250px";
    };
    this.closeRightNav = function() {
        document.getElementById("myRightSidenav").style.width = "0";
        document.getElementById("main").style.marginRight= "0";
        document.body.style.backgroundColor = "white";
    };
}
var sideNav = new SideNav();