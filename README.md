## await-for

A helper wrapper for quick error handling with async/await.

#### Normal usage

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
    return cb('something bad happened');
  }

  try {
    const userTasks = await fetchUserTasks(user.id);
    if (!userTasks) {
      return cb('user has no tasks as of now');
    } else {
      cb(userTasks);
    }
  } catch (e) {
    return cb('something bad happened');
  }
}
```

#### with await-for

await-for inspired by golang allow you to handle data and error together like this:

```js
import for from 'await-for';

async function asyncOperation(cb) {
  let err, user, userTasks;
  [err, user] = await for(fetchUser());
  if(err) return cb('something bad happened');
  if(!user) return cb('user not found');

  [err, userTasks] = await for(fetchUserTasks(user.id));
  if(err) return cb('something bad happened');
  if(!userTasks) return cb('user has no tasks as of now');
}
```

**_Typescript support comming soon_**
