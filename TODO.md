## Todo:

- ui
  - separate people into groups
    - calendar
    - offline
- dont send auth token to client
- separate dev/production apps for all external services

### Done:

- ~~check every so often if need to update users google calendar event statuses~~
- ~~google calendar api~~
- ~~zoom notifications make updates in firebase~~
  - ~~user joined~~
  - ~~user left~~
- ~~group handling~~
  - ~~groupId~~
  - ~~user can leave current group~~
    - ~~if that was the last user, group is deleted~~
- ~~group observer~~
- ~~user state~~
- ~~firebase~~
- ~~firestore~~
- ~~first time user~~
  - ~~user can join group by id~~
  - ~~user can create new group~~
- ~~useReducer & useContext~~
- ~~shared files/types between cfunctions and react app~~
- ~~write ./deploy.sh that deploys all everything~~
- ~~deal with nodemon EADDRINUSE for cloud functions~~
- ~~write ./run.sh that run and watches everything in multiple terminal windows~~
- ~~Dropped:rename all index.ts/js to other things~~
- ~~write ./deploy.sh that deploys all cloud functions~~
- ~~write ./run.sh that starts everything for local cloud functions testing~~
  - ~~better system for running multiple functions locally than manual different ports~~
- ~~hot reload cloud functions~~
