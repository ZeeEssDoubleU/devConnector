import axios from "axios";
import keys from '../config/keys_dev.js';

// gitHub api calls
export const getGithub = username => {
   const githubUrl = `https://api.github.com/users/${username}/repos`;
   const githubParams = {
      client_id: keys.githubClientID,
      client_secret: keys.githubClientSecret,
      per_page: 5,
      sort: "created: asc",
   };

	return axios
		.get(githubUrl, {
			params: githubParams,
			headers: {
				Authorization: null,
			},
		})
		.then(res => res.data)
		.catch(err => console.log("Errors:", err.response));
};
