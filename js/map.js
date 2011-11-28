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
    
    function remove_map_classes() {
        var objects = $('.map_container');
        objects.removeClass('.cm-blank_map');
        objects.removeClass('.cm-blank_bubble_map');
        objects.removeClass('.cm-blank_directions_map');
        objects.removeClass('.cm-wireless_map');
        objects.removeClass('.cm-wireless_bubble_map');
        objects.removeClass('.cm-wireless_directions_map');
        objects.removeClass('.cm-parking_map');
        objects.removeClass('.cm-parking_bubble_map');
        objects.removeClass('.cm-parking_directions_map');
        objects.removeClass('.cm-restaurant_map');
        objects.removeClass('.cm-restaurant_bubble_map');
        objects.removeClass('.cm-restaurant_directions_map');
        objects.removeClass('.cm-classroom_map');
        objects.removeClass('.cm-classroom_bubble_map');
        objects.removeClass('.cm-classroom_directions_map');
    }

    function init() {

        remove_map_classes();

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

            if(src === 'cm-undefined_directions_map') {
                src = 'cm-blank_directions_map';
            }
            $('.map_container').addClass(src);

            $('.map_container').click(function() {
                $.mobile.changePage('details.html');
            });

        } else {

		/************** LIST BUTTON *****************/
		document.getElementById("list").style.display="block";
		 $('#list').click(function() {
                $.mobile.changePage('listoptions.html');
            });
		/******************************************/

            var src = 'cm-' + query + '_map';

            if(src === 'cm-undefined_map') {
                src = 'cm-blank_map';
            }

			/************** LIST BUTTON *****************/
			document.getElementById("list").style.display="none";
			/******************************************/
            $('.map_container').addClass(src);
            alert(src);

            $('.map_container').click(function() {
                var query = getCookie('query');
                var src;

                if(query === '' || query === null || query === 'undefined') {
                    src = 'cm-blank_bubble_map'
                } else {
                    src = 'cm-' + query + '_bubble_map';
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
        $('.cm-bookmark').click(function () { toggleBookmark(this); });
    }

    $('#index').live('pageshow', function() { 
        resizeItems();
    });

    $('#map').live('pageshow', function() { init(); } );
    $('#details').live('pageshow', function() { details(); } );
