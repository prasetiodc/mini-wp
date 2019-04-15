# mini-wp

## Routes Users
|Routes|HTTP Method|Request|Response|Description| 
|----|----|----|----|----|----|
|/users  |POST  |fullname: String, email: String,  password: String |Success: Register a user,<br /> Error: Internal server error |Register a user|
|/users/login  |POST  |email: String , password: String |Success: Login as a user, <br/>Error: Internal server error |Login via email in Database|
|/users/googleLogin  |POST  |email: String , password: String  |Success: Login as a user via Google, <br />Error: Internal server error | Login via Google acount|

## Routes Articles
|Routes|HTTP Method|Request|Response|Description|
|----|----|----|----|----|----|
|/articles  |GET  |token : String|Success: Get user's articles,<br /> Error: Internal server error|Get user's posted articles|
|/articles  |POST  |token : String, <br />title: String,<br /> content: String ,<br /> image: File,<br /> Status : Boolean |Success: Create an article,<br /> Error: Internal server error | Create an article|
|/articles/:id  |PUT  |token : String, <br />, idArticle: String, title: String,<br /> content: String ,<br /> image: File,<br /> Status : Boolean |Success: Update an article, <br />Error: Internal server error |Update an article|
|/articles/:id  | DELETE  |token: String, idArticle: String |Success: Delete an article,<br /> Error: Internal server error |Delete an article|


## Usage
Make sure Node.js is installed in your computer then run these commands:

```javascript
npm install
npm run dev