import { GoogleUserInfo } from '@/types/user-slice';

/**
 * Authenticates user with Google OAuth2 using Chrome Identity API
 * @returns Promise with Google user information
 */
export const authenticateWithGoogle = async (): Promise<GoogleUserInfo> => {
  return new Promise((resolve, reject) => {
    // Get OAuth token using Chrome Identity API
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        console.error('OAuth error:', chrome.runtime.lastError);
        reject(new Error(chrome.runtime.lastError?.message || 'Failed to get auth token'));
        return;
      }

      // Fetch user info from Google API
      fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user info');
          }
          return response.json();
        })
        .then((data) => {
          const userInfo: GoogleUserInfo = {
            email: data.email,
            name: data.name,
            picture: data.picture,
            id: data.id,
          };
          resolve(userInfo);
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
          reject(error);
        });
    });
  });
};

/**
 * Signs out user by removing cached auth token
 */
export const signOutFromGoogle = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: false }, (token) => {
      if (!token) {
        resolve();
        return;
      }

      // Remove the cached token
      chrome.identity.removeCachedAuthToken({ token }, () => {
        // Revoke the token on Google's end
        fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            console.error('Error revoking token:', error);
            reject(error);
          });
      });
    });
  });
};
