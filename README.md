## await-here

A helper wrapper for quick error handling with async/await. [TL;DR](#with-await-here)

#### Installation

```
using yarn: Yarn add await-here
using npm: npm install await-here --save
```

#### Normal ways to handle error without `await-here`

Its somewhat cumbersome for a developer to handle error using async/await. the way below code is written the function will fail silently if the `somethingThatRetunsPromise` fails.

```js
async function(cb) {
  const data = await somethingThatRetunsPromise();
  // won't be executed any further if above line fails
  console.log(data);
  cb(data);
}
```

using catch block:

```js
async function asyncOperation(cb) {
  try {
    const data = await somethingThatRetunsPromise();
    console.log(data);
    cb(data);
  } catch (e) {
    console.log(e);
  }
}
```

but lets say you want to do some series of async queries.

```js
async function asyncOperation(cb) {
  try {
    const user = await fetchUser();
    if (!user) return cb('user not found');
  } catch (e) {
    return cb('unable to fetch user details');
  }

  try {
    const userTasks = await fetchUserTasks(user.id);
    if (!userTasks) {
      return cb('user has no tasks as of now');
    } else {
      cb(userTasks);
    }
  } catch (e) {
    return cb('unable to fetch user tasks');
  }
}
```

#### With await-here

await-here inspired by golang allow you to handle data and error together without hustle:

normal usecase:

```js
async function(cb) {
  const [err, data] = await somethingThatRetunsPromise();
  if(!err) return alert('something wrong happened');
  return cb(data);
}
```

lets see how it simplyfies the above example of feting user and its tasks

```js
import here from 'await-here';

async function asyncOperation(cb) {
  let err, user, userTasks;
  [err, user] = await here(fetchUser());
  if (err) return cb('unable to fetch user details');
  if (!user) return cb('user not found');

  [err, userTasks] = await here(fetchUserTasks(user.id));
  if (err) return cb('unable to fetch user tasks');
  if (!userTasks) return cb('user has no tasks as of now');
}
```

**_Typescript support comming soon_**
