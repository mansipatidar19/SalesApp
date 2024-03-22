*** Assignment Running:

To start the server and application properly, one needs to enter the below commands:




*** Assignment Inspirations:


-- Bcakend: In the Backend, I have used the MongoDb database as per the instructions. Below is the detailed description 
            of the configrations, env, controller and routes of the server:

1) Configurations: In the db configuration, I have added the mongo URI from the Atlas and checked using connection
                   whether the connection is correctly established or not. In the env configuration, I have configured 
all the variables stores in the dotenv file and exported them to use in different parts of the server.

2) Models : I have created 2 models, one sales model and another one is user model. In user model, all the relevant 
            information of the user is stored in the respective format as shown in the model. In the sales model, 
timestamps are also added along with the author who added the sale using the object id of the userModel.

3) Controller: In the controller, there are 5 main controls. 
                - Register: for user registration in which all the user's data is stored in the db.
                - Login : for login of the author & token generation using middleware authorization.
                - addSales : to add a product along with the logged in user details. 
                - totalRevenue : to get today's total revenue using aggregate function of mongoDB and Date function.
                - top5Sales: In this the top 5 sales are displayed via aggregate function using pipelines & stages.

4) Middleware: In the authorize middleware when the user logs in, then a token is generated and when the user tries 
                to perform any task that is protected then the authorize middleware will check whether the toekn 
is correct or not? is the token there or not? If there is a token then the user is directed to the next middleware.

5) Routes: In this routes are defined using express Router. Added the get, post requests for the respective 
            controllers and middleware is added for the protected routes (addSales, top5Sales, totalRevenue).


-- Frontend: The frontend is created in the previous assignment but some changes are made in this assignment to 
             connect the frontend and backend. Below are the changes:

1) Protected Route: If a user is not logged in, then the user will not be able to see the addSales, totalRevenue &
                    the top5Sales its done via context API to manage the token.

2) Context API: Used context API to get the token in any of the component easily without refreshing the page. I have 
                used context API because its a small application I just need to store the token only, If the app 
requires multiple data to be shared via components then we can use Redux also.

3) sessionStorage : I have utilized the sessionStorage to store the token when a user loggs in and when the user 
                    closes the tab then the session is destroyed automatically. Also, if in the same browser the
user wants to login via different ids then its also possible through sessionStorage. 



*** Key Learnings:
- MongoDB basics
- JWT authentication 
- Model creation 
- Middleware 
- React-router-dom
- Context API 
- Session Storage
- Protected Routing

--- Most Important : Error Resolving