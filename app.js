// Get token from localStorage instead of hardcoded 'undefined'
const token = localStorage.getItem('spotify_token');

if (!token) {
  alert('No Spotify access token found. Please log in.');
  // Optionally redirect to login page here:
  // window.location.href = '/login.html'; // or wherever your login page is
}

async function fetchWebApi(endpoint, method = 'GET', body = null) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method,
    body: body ? JSON.stringify(body) : null
  });

  if (!res.ok) {
    // Handle errors, e.g. token expired, unauthorized
    throw new Error(`Spotify API error: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}

async function getTopTracks() {
  // Fetch top tracks
  return (await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5')).items;
}

// Immediately invoke async function to get tracks and log them
(async () => {
  try {
    const topTracks = await getTopTracks();
    console.log(
      topTracks.map(
        ({ name, artists }) => `${name} by ${artists.map(artist => artist.name).join(', ')}`
      )
    );
  } catch (error) {
    console.error(error);
    alert('Failed to fetch top tracks. Please check your token and login status.');
  }
})();
