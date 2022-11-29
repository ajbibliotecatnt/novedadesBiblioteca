function drop() {

	document.getElementById("myDropdown").classList.toggle("show");
		}

window.onclick = function(e) {

	if (!e.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		for (var d = 0; d < dropdowns.length; d++) {
			var openDropdown = dropdowns[d];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

window.onscroll = function() {stickyF()};

var header = document.getElementById("navegacion");
var sticky = header.offsetTop;

function stickyF() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

