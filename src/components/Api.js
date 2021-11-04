const fetchFunction = (url,  headers) => {
  return fetch(url, headers)
      .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
      .catch((err) => {
        console.log(err);
    })
}


export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetchFunction(`${this._baseUrl}/users/me`, {
      headers: this._headers
    });
  }

  getInitialCards() {
    return fetchFunction(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
  }

  editUserInfo(data) {
    return fetchFunction(`${this._baseUrl}/users/me`, {
       method: "PATCH",
       headers: this._headers,
       body: JSON.stringify(data)
    });
  }

  addPostCard(data) {
    return fetchFunction(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
   });
  }

  addLike(cardId) {
    return fetchFunction(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
   });
  }

  removeLike(cardId) {
    return fetchFunction(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
   });
  }

  deleteCard(cardId) {
    return fetchFunction(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
   });
  }

  editAvatar(data) {
    return fetchFunction(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
   });
  }
}
