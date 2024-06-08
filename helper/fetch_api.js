// Marvel API public and private keys
const publicKey = "32b609775ad7bf150d4e5ade8679bfc6";
const privateKey = "998a0e14e695346472dcda503ab8c0518834b57d";

// Generate a timestamp
const ts = new Date().getTime(); // Current timestamp in milliseconds

// Concatenate timestamp, private key, and public key to create the hash string
const hashString = ts + privateKey + publicKey;

// Create an MD5 hash of the concatenated string
const hash = CryptoJS.MD5(hashString).toString();

// Marvel API endpoint with authentication parameters
const superhero_URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

/**
 * Fetches superhero data from the Marvel API.
 *
 * @returns {Promise<Object>} The superhero data.
 */
export const fetchCharApi = async () => {
  try {
    // Fetch data from the Marvel API
    const response = await fetch(superhero_URL);

    // Parse the JSON response
    const data = await response.json();

    // Return the data
    return data;
  } catch (err) {
    // Log any errors
    console.log(err);
  }
};
