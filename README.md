# fetch

A thin wrapper around the fetch api

- normalizes `response.ok`
- returns the response body as JSON
- uses the localstorage item `token` to authenticate with the api

## Usage

```
yarn add @klw/fetch
```

```
import { get, post, put, delete } from "@klw/fetch";

const resp = await get(`/api/users`);
if (resp.ok) {
    ...
}

const resp = await post(`/api/users/login`, { email, password });
if (resp.ok) {
    ...
}

const resp = await put(`/api/users/u_id`, { firstName, lastName });
if (resp.ok) {
    ...
}

const resp = await del(`/api/users/u_id`);
if (resp.ok) {
    ...
}

```

Options are available (not documented at the moment).
