import { useAuth } from '../Context/AuthContext';

export const fetchWithAuth = async (url, options = {}) => {
  const { token, refreshAccessToken } = useAuth();

  let accessToken = token;

  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, { ...options, headers });

  // Jika token expired, coba refresh token dan ulangi request
  if (response.status === 401) {
    accessToken = await refreshAccessToken();
    options.headers = { ...options.headers, Authorization: `Bearer ${accessToken}` };
    return fetch(url, options);
  }

  return response;
};
