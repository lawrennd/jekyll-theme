var slideIndex = 1;

function setDivs(group) {
  var frame = document.getElementById("range-".concat(group)).value
  slideIndex = parseInt(frame)
  showDivs(slideIndex, group);
}

function plusDivs(n, group) {  
  var x = document.getElementsByClassName(group);
  var totalFrames = x.length;
  
  slideIndex += n;
  
  // Handle wrapping using modulo arithmetic
  slideIndex = ((slideIndex - 1) % totalFrames + totalFrames) % totalFrames + 1;
  
  showDivs(slideIndex, group);
  document.getElementById("range-".concat(group)).value = slideIndex
}

function showDivs(n,group) {
  var i;
  var x = document.getElementsByClassName(group);
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}
