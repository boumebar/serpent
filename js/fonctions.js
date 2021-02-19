window.onload = function(){
    this.document.onkeydown = function handleKeyDown(e){
        var key = e.keyCode;
        
        // console.log(key);
        switch(key){
            case 13 :
                document.getElementById('rejouer').click();
                break;
            default :
                return;
        }
    }
}