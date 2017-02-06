window.onload = function() {

    function get_joke(cname) {
        $.ajax({
            url: 'https://api.icndb.com/jokes/random',
            dataType: 'json',
            success: function(json) {
                if (json.type == "success") {
                    document.getElementById('seriousgamer').innerHTML = 
                        "<p>\"<i>" + json.value.joke + "</i>\"</p>";
                    setCookie(cname, json.value.joke, 3);
                } else {
                    console.log("failed to get joke");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("request error");
            }
        });
    }

	function setCookie(cname, cvalue, gapduration) {
		var d = new Date();
		//d.setTime(d.getTime() + (gapduration*24*60*60*1000)); // it means days
		d.setMinutes(d.getMinutes() + gapduration); // gap means minutes
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	function checkCookie() {
        var cookie_name = 'scriptkiddie';
		var joke4today = getCookie(cookie_name);
		if (joke4today != "") {
			//alert("Welcome again " + joke4today);
			console.log("Your last joke timestamp was: " + joke4today);
            document.getElementById('seriousgamer').innerHTML =
                "<p>\"<i>" + joke4today + "</i>\"</p>";

		} else {
			console.log("Getting a joke ...");
			//joke4today = prompt("Please enter your name:", "");
			//joke4today = "JOKE @" + new Date();
			/*
			if (joke4today != "" && joke4today != null) {
				setCookie(cookie_name, joke4today, 3); 
			}
            */
			setTimeout(get_joke(cookie_name),5000);
		}
	}

	checkCookie();
}; 
