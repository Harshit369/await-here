## await-here

A helper wrapper for quick error handling with async/await. [TL;DR](#Now-using-await-here)

#### Installation

```
using yarn: yarn add await-here
using npm: npm install await-here --save
```

#### Normal ways to handle error earlier

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

#### Now using await-here

await-here inspired by golang allow you to handle data and error together without hustle:

```js
async function(cb) {
  const [err, data] = await somethingThatRetunsPromise();
  if(err) return alert('something wrong happened');
  return cb(data);
}
```

---

But lets say you want to do some series of async queries like this:

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

lets see how **await-here** simplyfies the above example of feting user and its tasks with all possible error cases and values

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

### Chain

In adition to error handler there's an additional `chain` function. which as the name suggests lets you chain transformers or promises in order like this:

```js
async function seriesOfAsyncOperations() {
  const [err, finalFormatToReturn] = await chain(
    fetchUsers(),
    users => {
      return filter(users, user => user.weLove);
    },
    user => api.fetchUserTasks(user.id),
    tasks => filter(tasks, task => task.unfinished)
  );
}

what it does is saves from the headache of taking care of error at each step
```

**Supports Typescript 🤟**

```ts
here<T, E = any>
chain<T, R = T, E = any>

T: promise resolve type
R: final expected result type after transformations defaults to T
E: custom error type defaults to any
```
