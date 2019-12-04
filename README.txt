* DB SETUP:
Data for import is stored in /data folder:
- news-sourse.json	- news collection
- users-source.json	- users collection

/modules/constants.js stores data for
- db name		(default: 'news-db')
- news collection	(default 'news')
- users collection	(default 'users')

* FILE STRUCTURE:
- modules/
---- constants.js		
---- logger.js
---- passport.js		- passport.js config
- queries/
---- newsQuery.js		- news GRUD operations
---- usersQuery.js		- users GRUD operations
- routes/
---- authRoutes.js		- routes for local authorization
---- facebookAuthRoutes.js	- routes for facebook authorization
---- newsRoutes.js		- routes for news GRUD operations
- schemas/
---- newsSchema.js		- news schema for MongoDB
---- userSchema.js		- user schema for MongoDB

Entry point: app.js

* TEST DATA

- news
{
	"name": "The Irish Times",
	"description": "The Irish Times online. Latest news including sport, analysis, business, weather and more from the definitive brand of quality news in Ireland.",
	"url": "https://www.irishtimes.com",
	"category": "general",
	"language": "en",
	"country": "ie"
},

- user
{
	"login": "testUser",
	"password": "123",
	"email": "testUser@gmail.com",
	"name": {
	"firstName": "Test",
	"lastName": "User"},
	"isAdmin": false
}

* ROUTES

- News GRUD
Get all:	GET /news 
Get by id:	GET	/news/:id
Create:		PUT	/news 
Update:		POST	/news
Delete: 	DELETE	/news/:id

- Auth
Login:		GET	/login
		POST	/login
Signup:		GET	/signup
		POST	/signup
Logout:		GET	/logout
Profile		GET	/profile

-  Facebook Auth
Login + Signup:	GET 	/auth/facebook
Callback	GET 	/auth/facebook/callback


* RUN PROD APP VERSION:
run start