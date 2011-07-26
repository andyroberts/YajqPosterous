/* YajqPosterous.js - Yet Another jQuery Posterous plugin
 * (c) 2011 Andrew Roberts - http://www.andy-roberts.net
 * Released under MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

(function($) {

	$.fn.yajqposterous = function(options) { 

		options = $.extend({}, $.fn.yajqposterous.defaults, options);

		/* Credit: jquery.TimeAgo.js */ 
		var zeropad = function (num) {
		  return ((num < 10) ? '0' : '') + num;
		};
		
		/* Credit: jquery.TimeAgo.js */ 
		var iso8601 = function (date) {
		  return date.getUTCFullYear()
		    + "-" + zeropad(date.getUTCMonth()+1)
		    + "-" + zeropad(date.getUTCDate())
		    + "T" + zeropad(date.getUTCHours())
		    + ":" + zeropad(date.getUTCMinutes())
		    + ":" + zeropad(date.getUTCSeconds()) + "Z";
		};

		/* Credit: John Resig (http://ejohn.org/blog/javascript-pretty-date/); Updated by AR for longer date ranges*/ 
		var prettyDate = function(time) {
			var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
			diff = (((new Date()).getTime() - date.getTime()) / 1000),
			day_diff = Math.floor(diff / 86400);
			
			if ( isNaN(day_diff) || day_diff < 0 )
				return;
			
			return day_diff == 0 && (
				diff < 60 && "just now" ||
				diff < 120 && "1 minute ago" ||
				diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
				diff < 7200 && "1 hour ago" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
				day_diff == 1 && "Yesterday" ||
				day_diff < 7 && day_diff + " days ago" ||
				day_diff < 85 && Math.ceil( day_diff / 7 ) + " weeks ago" ||
				"many moons ago";
		}

		var parseFunctions = {
			'regular': function parseRegular(post) {
				var postString = "<div class=\"title\"><a href=\""+post['full_url']+"\">" + post['title'] + "</a></div>";
				var bodyString = post['body_excerpt'];
				bodyString += " <a href=\""+post['full_url']+"\">[Read more]</a>";
			
				postString += "<div class=\"post-body\">" + bodyString + "</div>";
				return postString;
			}
		};


		return this.each(function() {
				var $this = $(this);
				$.ajax({
					type:'GET',
					dataType: "jsonp",
					url:"http://posterous.com/api/2/sites/" + options.username + "/posts/public",
					success: function(posts_api_read) {
			
						if (posts_api_read == null) {
						} else {
							var postsBuffer = "";
							$.each(posts_api_read, function(i, post){
								if (i >= options.maxNumberOfPosts) {
									return false;
								}
								var postDate = new Date(post["display_date"]);
								postsBuffer += "<div class=\"post\">" + parseFunctions["regular"].apply(this, [post]) + "<div class=\"postDate\">"+prettyDate(iso8601(postDate))+"</div></div>";
							});
							$this.append("<div class=\"posts\">"+postsBuffer+"</div>");
						}
					},
					error: function() {}

				});
		});
	}

	$.fn.yajqposterous.defaults = {
        	maxNumberOfPosts: 5,
		username: 'andyroberts-uk'
	}; 

})(jQuery);
