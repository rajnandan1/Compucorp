**

Build Process
-------------

**

 - install npm
 - install node.js
 - clone the repository
 - on the root folder run **npm install connect server-static**
 - npm install gulp -g
 - npm install gulp-sass --save-dev
 
 To Start the server run
**node app.js**

 *Ths soltion*

Search box is a form. when someones submits a query first the code checks the localstorage.

If the query is present in localstorage then it returns it from localstorage.
If it is not there in localstorage then it makes an API call to spotify gets the result and stores it in localstorage. Everything is done by using promises. So that the user knows that we are waiting for data.

Also each query is accompanied with a pageno. The default pagesize is 12 defined in AuthService.js


----------
When an item is clicked then we show a modal. The UI for artists and albums are different. 
When viewing an album the user can also a preview a track from the album
