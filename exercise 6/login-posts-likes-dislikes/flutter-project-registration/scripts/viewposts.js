(() => {
	const db = firebase.database();
	const tweetsDB = db.ref('/tweets');
	const postContainer = document.getElementById('post-container');
	const newPost = document.getElementById('new-post');
	const post = data => {
		const state = data.val();

		return `<figure class="profile-avatar post-section-avatar">
              <img src="images/avatar.png" alt="BP" class="profile-image">
          </figure>
          <div class="post-content">
              <div class="post-author">
                  <h3 class="post-author-name">${state.username}</h3>
                  <span class="post-delimiter fa fa-circle"></span>
                  <span class="post-date">${time_ago(new Date(state.date))}</span>
              </div>
              <p class="post-text">${state.message}</p>
              <div class="post-footer">
                  <div class="post-reaction">
                      <button class="far fa-thumbs-up like-btn" data-id="${data.key}"></button>
                      <span class="post-likes">${state.likes}</span>
                  </div>

                  <div class="post-reaction dislike-container">
                      <button class="far fa-thumbs-down dislike-btn" data-id="${data.key}"></button>
                      <span class="post-dislikes">${state.dislikes}</span>
                  </div>
              </div>
          </div>
          <div class="post-close">
              <button class="post-close fa fa-times" data-id="${data.key}"></button>
          </div>`;
	};

	newPost.addEventListener('submit', event => {
		// Logic when posting new tweet
		event.preventDefault();
		const postMessage = document.getElementById("new-post-text").value;
        window.tweet.post(postMessage);
		//update tweets count
		//let totalTweets = document.getElementById("profile-posts-count").innerHTML;
		//document.getElementById("profile-posts-count").innerHTML = String(Number(totalTweets) + 1);
  });

  firebase.auth().onAuthStateChanged(user => {
	// Update profile posts information

    document.getElementById("profile-name").innerHTML = user.displayName;
    var likes = 0;
    var tweets = 0;
    firebase.database().ref('users/' + user.uid).once('value').then(snapshot => {
      if (snapshot.val()) {
        tweets = parseInt(snapshot.val()['tweets']);
        likes = parseInt(snapshot.val()['likes']);
      }
    });
    document.getElementById("profile-posts-count").innerHTML = tweets;
    document.getElementById("profile-likes-count").innerHTML = likes;

});

tweetsDB.on('child_added', data => {
	/*
	if (!validateUser()) {
		return;
	}
	var newPost = document.createElement('div');
	newPost.innerHTML = post(data).trim();

	postContainer.appendChild(newPost)
	*/

	const newPostElement = document.createElement('div');
        newPostElement.innerHTML = post(data);
        newPostElement.setAttribute('class', 'post');


        let postDeleteButton = newPostElement.childNodes[4].childNodes[1]
        let postLikeButton = newPostElement.childNodes[2].childNodes[5].childNodes[1].childNodes[1];
        let postDislikeButton = newPostElement.childNodes[2].childNodes[5].childNodes[3].childNodes[1];

        postLikeButton.setAttribute('clicked', 'false');
        postDislikeButton.setAttribute('clicked', 'false');

        postDeleteButton.addEventListener("click", function () {
            let postId = postDeleteButton.getAttribute('data-id');
            console.log("Post delete event occured!");
            window.tweet.delete(postId);

            location.reload();
        });
        postLikeButton.addEventListener("click", function () {
            let postId = postLikeButton.getAttribute('data-id');
            console.log('Liked post with ID' + postId);
            if (postLikeButton.getAttribute('clicked') === 'true') {
                window.tweet.decrementLikes(postId);
                postLikeButton.setAttribute('clicked', 'false');
            } else {
                window.tweet.incrementLikes(postId);
                postLikeButton.setAttribute('clicked', 'true');
            }
        })
        postDislikeButton.addEventListener("click", function () {
            let postId = postDislikeButton.getAttribute('data-id');
            console.log('Disliked post with ID' + postId);
            if (postDislikeButton.getAttribute('clicked') === 'true') {
                window.tweet.decrementDislikes(postId);
                postDislikeButton.setAttribute('clicked', 'false');
            } else {
                window.tweet.incrementDislikes(postId);
                postDislikeButton.setAttribute('clicked', 'true');
            }
        })

        postContainer.appendChild(newPostElement);
});

tweetsDB.on('child_changed', data => {
	// Like / Dislike logic here
	if (!validateUser()) {
		return;
	}

	document.querySelector(`.like-btn[data-id=${data.key}]`).nextElementSibling.innerText = data.val().likes;
	document.querySelector(`.dislike-btn[data-id=${data.key}]`).nextElementSibling.innerText = data.val().dislikes;

	this.auth.getUserStats(firebase.auth().currentUser.uid).once('value').then(data => {
		const {
			likes,
			tweets
		} = data.val();
		document.getElementById("profile-posts-count").innerText = tweets;
		document.getElementById("profile-likes-count").innerText = likes;
	});
});

	function validateUser() {
		if (!firebase.auth().currentUser) {
			// user is not logged in
			window.location = 'index.html?error=accessDenied';
			return false;
		}

		return true;
	}

	// Helper function for converting time from milliseconds to human readable format
	function time_ago(time) {
		const time_formats = [
			[60, 'seconds', 1], // 60
			[120, '1 minute ago', '1 minute from now'], // 60*2
			[3600, 'minutes', 60], // 60*60, 60
			[7200, '1 hour ago', '1 hour from now'], // 60*60*2
			[86400, 'hours', 3600], // 60*60*24, 60*60
			[172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
			[604800, 'days', 86400], // 60*60*24*7, 60*60*24
			[1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
			[2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
			[4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
			[29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
			[58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
			[2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
			[5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
			[58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
		];
		let seconds = (+new Date() - time) / 1000,
			token = 'ago',
			list_choice = 1;

		if (seconds === 0) {
			return 'Just now'
		}
		if (seconds < 0) {
			seconds = Math.abs(seconds);
			token = 'from now';
			list_choice = 2;
		}
		let i = 0,
			format;
		while (format = time_formats[i++])
			if (seconds < format[0]) {
				if (typeof format[2] === 'string')
					return format[list_choice];
				else
					return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
			}
		return time;
	}
})();