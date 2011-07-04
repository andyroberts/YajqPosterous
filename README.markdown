# YajqPosterous - Yet another jQuery Posterous plugin

(Last updated 30th June 2011)

## Description

YajqPosterous is a jQuery plugin for retrieving posts via the official Posterous API.
The objective is to create a simple blog feed widget displaying snippets of posts to embed in webpages.
And with CSS it's possible customize the appearance too.

## Usage

1\. Link to required Javascript files. Naturally, as it's a jQuery plugin, you'll need to link to jQuery too.

```html
...
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
<script type="text/javascript" src="yajqposterous.js"></script>
...
```

2\. Insert the following Javascript: 

```html
  <script type="text/javascript">
    $(document).ready(function(){
      $('#blogFeed').yajqposterous({username: 'your_posterous_username'});
    });
  </script>
```

3\. Ensure the selector exists. In this instance you need to place the following HTML into the document body:

```html
  <div id="blogFeed"></div>
```

YajqPosterous will populate this div with the items from your specified Posterous feed.

By default it will retrieve five posts from the specified feed. To change this value, set the 'maxNumberOfPosts' option too, e.g.:

```html
  $('#blogFeed').yajqposterous({username: 'your_posterous_username', maxNumberOfPosts: 10});
```

See posterous_test.html for sample use and styling.

## Roadmap

1. Use setInterval to check with Posterous for new posts.

2. Include reasonable error message when API is not available.

3. Make fuzzy timestamps an option.

## Author

Andrew Roberts

Twitter: [@andyroberts_uk](http://twitter.com/andyroberts_uk)

Web: http://www.andy-roberts.net

Github: https://github.com/andyroberts

## License

(c) 2011 Andrew Roberts

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php). 

