/*
 * Keyboard shortcut for style toggle is the "\" key
 */

// Change this var whenever you add new custom css file
var myStyleFiles = ["console.css"]

//JS magic for turning our custom styles on/off
var myStyles = [];
for (var i=0; i<document.styleSheets.length; i++){
    var style = document.styleSheets[i];
    var styleHref = style.href;
    var styleHrefArray = styleHref.split('/');
    var styleName = styleHrefArray[styleHrefArray.length-1];

    if (myStyleFiles.indexOf(styleName) > -1){
        myStyles.push(style);
    }
}

document.onkeyup=function(e){
    if (e.keyCode == 220){
        for (var i = 0; i < myStyles.length; i++){
            var style = myStyles[i];
            var status = style.disabled;
            if (status){
                style.disabled = !status;
            } else {
                style.disabled = true;
            }
        }
    }
};