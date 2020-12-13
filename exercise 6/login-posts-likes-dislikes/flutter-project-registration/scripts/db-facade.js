(() => {
	const initDatabase = () => {
		const config = {
			apiKey: "AIzaSyDamu-YcK408nYTP1MG4hNdrXpyU-R4KL8",
			authDomain: "flutter-38595.firebaseapp.com",
			databaseURL: "https://flutter-38595.firebaseio.com",
			projectId: "flutter-38595",
			storageBucket: "",
			messagingSenderId: "114656105297"
		};
		firebase.initializeApp(config);
	};
	initDatabase();

	/**
	 * Log-ins with provided information.
	 * Parameters:
	 * - email <string> - email to be used
	 * - password <string> - password to be user
	 * - callback <function> - function to call once the login operation is completed.
	 *	The parameters for this function are:
	 *		- successfull <boolen> true if log-in is successfull, false otherwise
	 *  	- errorCode <number> the error code in case sucessfull = false
	 *		- errorMessage <string> the error message in case sucessfull = false
	 **/
	const login = (email, password, callback) => {
		return firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
			// Success - redirect
			callback(true);
		}, (error) => {
			const errorCode = error.code;
			//Here we use the error message like it is returned by the firebase (the message is in english)
			const errorMessage = error.message;

			// handle error with login
			callback(false, errorCode, errorMessage);
		});
	};

	const logout = () => {
		return firebase.auth().signOut();
	};

	/**
	 * @callback registerCallback
	 * @param {boolean} successful if log-in is successful, false otherwise
	 * @param {number} errorCode the error code in case successful = false
	 * @param {string} errorMessage the error message in case successful = false
	 */

	/**
	 * Register given user with given information
	 *
	 * @param {string} username
	 * @param {string} email
	 * @param {string} password
	 * @param {registerCallback} callback function to call once the register operation is completed
	 *
	 **/
	const register = (username, email, password, callback) => {
		firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
			data.user.updateProfile({
				displayName: username
			}).then(function () {
				callback(true);
			}, function (error) {
				console.log(error);
			});
		}, (error) => {
			const errorCode = error.code;
			let errorMessage;

			// Here we analyze the code and set custom error message (in bulgarian) just for the sake of the exersice
			switch (errorCode) {
				case 'auth/weak-password':
					{
						errorMessage = "Registration failed. Weak password.";
						break;
					}
				case 'auth/email-already-in-use':
					{
						errorMessage = "Registration failed. Email is already used.";
						break;
					}
				case 'auth/invalid-email':
					{
						errorMessage = "Registration failed. Email is not valid.";
						break;
					}
				default:
					{
						errorMessage = "Registration failed.";
					}
			}

			callback(false, errorCode, errorMessage);
		});
	};

	const postTweet = (message) => {
		const currentUser = firebase.auth().currentUser;
		const userDisplayName = currentUser ? currentUser.displayName : "";
		const userId = currentUser ? currentUser.uid : "";
		const date = new Date().toString();
		const likes = 0;
		const dislikes = 0;
		const db = firebase.database();
		const tweetDbRef = db.ref('tweets/');
		const userDbRef = currentUser ? db.ref('users/' + userId) : undefined;

		tweetDbRef.push({
			'username': userDisplayName,
			'userId': userId,
			'date': date,
			'likes': likes,
			'dislikes': dislikes,
			'message': message
		});

		if (userDbRef) {

			userDbRef.once('value').then(snapshot => {
				if (snapshot.val()) {
					let tweets = parseInt(snapshot.val()['tweets']) + 1;

					// increment count of posts for current user
					userDbRef.update({
						tweets: tweets
					});
				} else {

					userDbRef.set({
						'likes': '0',
						'tweets': '1'
					});
				}
			});
		}
	};

	const incrementLikes = (id) => {
		reactOnTweet(id, 'likes', 'increment');
	};

	const decrementLikes = (id) => {
		reactOnTweet(id, 'likes', 'decrement');
	};

	const incrementDislikes = (id) => {
		reactOnTweet(id, 'dislikes', 'increment');
	};

	const decrementDislikes = (id) => {
		reactOnTweet(id, 'dislikes', 'decrement');
	};

	const reactOnTweet = (id, reaction, operation) => {
		const db = firebase.database();
		const dbRef = db.ref('tweets/' + id);

		dbRef.once('value').then(snapshot => {
			let count = parseInt(snapshot.val()[reaction]);

			if (operation === 'increment') {
				count += 1;

				db.ref('users/' + snapshot.val()["userId"]).once('value').then(userSnapshot => {
					const likes = parseInt(userSnapshot.val()['likes']) + 1;

					db.ref('users/' + snapshot.val()["userId"]).update({
						'likes': likes
					});
				});
			} else {
				count -= 1;
			}

			dbRef.update({
				[reaction]: count
			});
		});
	};

	const deleteTweet = id => {
		const db = firebase.database();
		const dbRef = db.ref('tweets/' + id);

		dbRef.remove();
	};

	const getUserStats = id => {
		const db = firebase.database();
		return db.ref('users/' + id);
	};

	this.auth = {
		login: login,
		logout: logout,
		register: register,
		getUserStats: getUserStats
	};

	this.tweet = {
		post: postTweet,
		delete: deleteTweet,
		incrementLikes: incrementLikes,
		decrementLikes: decrementLikes,
		incrementDislikes: incrementDislikes,
		decrementDislikes: decrementDislikes,
	};
})(this); //self executing the main function with certain parameter