document.getElementById("sub").addEventListener("click", function(event) {
  event.preventDefault();
  
  let website = document.getElementById("url").value;
  let ftype = document.getElementById("filetype").value;
  
  if((website !== "") && (ftype !== "")) {
	  let out = document.getElementById("result");
	  out.style.width = "40px";
	  out.style.height = "40px";
	  out.src = "images/loading.gif";
	  out.alt = "loading...";
	  out.title = "loading...";
	  document.getElementById("qrholder").style.display = "block";
	  
	  getData();
  } else {
	alert("Please complete all steps!");
  }
});

var advshown = false;

document.getElementById("adv").addEventListener("click", function(event) {
  event.preventDefault();

  if(!advshown) {
	  document.getElementById("advdiv").style.display = "block";
	  advshown = true;
  } else {
	  document.getElementById("advdiv").style.display = "none";
	  advshown = false;
  }
  
});

function getData() {
	let website = document.getElementById("url").value;
	let size = document.getElementById("size").value;
	let ftype = document.getElementById("filetype").value;
	let color = document.getElementById("color").value;
	let bgcolor = document.getElementById("bgcolor").value;
	let margin = document.getElementById("margin").value;
	let ecc = document.getElementById("ecc").value;
	
	let url = "https://api.qrserver.com/v1/create-qr-code/?size=" + size + "x" + size + "&data=" + website + "&format=" + ftype;
	
	if(color !== "") url += "&color=" + color;
	if(bgcolor !== "") url += "&bgcolor=" + bgcolor;
	if(margin !== "") url += "&margin=" + margin;
	if(ecc !== "") url += "&ecc=" + ecc;
	
	if((website !== "") && (ftype !== "")) {
		fetch(encodeURI(url), {
			"method": "GET"
		})
		.then(response => {
			console.log(response);
			let div = document.getElementById("result");
			div.src = response.url;
			div.style.width = "250px";
			div.style.height = "250px";
			div.alt = "QR Code: " + website;
			div.title = "QR Code: " + website;
		})
		.catch(err => {
			console.error(err);
		});
	}
}