export function authHeader() {
    // return authorization header with jwt token
    const token = localStorage.getItem('token');
    if (token) {
      return {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: token,
          Accept: '*/*',
        },
      };
    } else {
      return {};
    }
  }