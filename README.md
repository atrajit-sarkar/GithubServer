# What to do with this repo
- Fork this repo
- Creat your own repo with .ARW files and rename the google photos files to .ARW.JPG using `rename.py`.
- After that edit `script.js` in the portion givem below:
- Below in place of `serverreponame` enter your repo name where you have ARW and jpg files and in place of `username` give you github username.
```js
const repoURL = 'https://api.github.com/repos/(username)/(serverreponame)/contents/';
```
- Then go to settings and publish the forked repo using github page and enjoy your ARW preview with unlimited space.
- Also to customize website favicon icon you can generate favicon from [here](https://favicon.io/favicon-converter/) and unzip the favicon_io folder and upload it to the forked repo.