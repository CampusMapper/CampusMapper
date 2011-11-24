$(document).ready(function() {

    // gets url parameters
    function getUrlVars() {
        var vars = [], hash;
        var hashes =
        window.location.href.slice(window.location.href.indexOf('?')
            + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    // sets a cookie
    function setCookie(name,value,days) {
        if (days) {
            var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    // gets a cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    // deletes the cookie
    function deleteCookie(name) {
        setCookie(name,"",-1);
    }

    function init() {

        var saved = getCookie('query');
        var params = getUrlVars();
        var query;

        var direction = params['directions'];

        if(saved === null || saved === '' || saved === 'undefined') {
            query = params['query'];
            setCookie('query', query);
        } else {
            query = saved;
        }

        if( "" + params['query'] !== 'undefined') {
		 query = params['query'];
            setCookie('query', query);
            deleteCookie('directions');
        }

        if(direction === 'true') {
            setCookie('directions', 'true');
        } else {
            direction = getCookie('directions');
        }

        if(direction === 'true') {
		
		/************* LIST BUTTON ****************/
		document.getElementById("list").style.display="block"; 
		 $('#list').click(function() {
                $.mobile.changePage('listdirections.html');
            });
		/******************************************/

            var src = 'img/' + query + '_directions_map.png';

            if(src === 'img/undefined_directions_map.png') {
                src = 'img/blank_directions_map.png';
            }

            $('#map_container').attr('src', src);
            $('#map_container').click(function() {
                $.mobile.changePage('details.html');
            });

        } else {

		/************** LIST BUTTON *****************/
		document.getElementById("list").style.display="block";
		 $('#list').click(function() {
                $.mobile.changePage('listoptions.html');
            });
		/******************************************/

            var src = 'img/' + query + '_map.png';

            if(src === 'img/undefined_map.png') {
                src = 'img/blank_map.png';

			/************** LIST BUTTON *****************/
			document.getElementById("list").style.display="none";
			/******************************************/
		}

            $('#map_container').attr('src', src);

            $('#map_container').click(function() {
                var query = getCookie('query');
                var src;

                if(query === '' || query === null || query === 'undefined') {
                    src = 'img/blank_bubble_map.png'
                } else {
                    src = 'img/' + query + '_bubble_map.png';
                }

                $(this).attr('src', src);
                $(this).click(function() {
                    $.mobile.changePage("details.html");
                });
            });
        }

    }

    function resizeItems() {
        var total_height = $(document).height();
        var header_height = $("div.ui-header").height();
        var footer_height = $("div.ui-footer").height();

        var height = total_height - header_height - footer_height;
        var padding = height/6 - 82; 

        $("a.cm-button-link-wrapper").css("padding-top", "" + padding);
        $("a.cm-button-link-wrapper").css("padding-bottom", "" + padding);
    }

    function toggleBookmark(target) {
        var saved = getCookie('saved');
        
        if(saved === null || saved === '' || saved === 'undefined') {
            setCookie('saved', 'true');
            $(target).attr('src', 'img/bookmark_yellow.png');
        } else {
            deleteCookie('saved');
            $(target).attr('src', 'img/bookmark_grey.png');
        }
    }

    function details() {
        toggleBookmark('.cm-bookmark');
        toggleBookmark('.cm-bookmark');
        $('.cm-bookmark').click(function () { toggleBookmark(this) });
    }


    $('#index').live('pageshow', function() { 
        deleteCookie('query'); 
        deleteCookie('directions');
        resizeItems();
    });

    $('#map').live('pageshow', function() { init() } );

    $('#details').live('pageshow', function() { details() } );
});
