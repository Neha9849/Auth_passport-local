# Authentication using Passport-local Strategy
Passport-local strategy is a session based authentication i.e it uses *Browser cookies* and *Backend sessions* to manage logged-in and logged-out users.

## Live Demo 👀
View live [Demo](https://boiling-castle-31447.herokuapp.com/)
## Local Setup 👩‍💻
> Make sure to have Node and NPM installed
1. Clone this repo
   ``` git clone https://github.com/Neha9849/Auth_passport-local.git  ```
 2. Change directory
  ``` cd Auth_passport-local ```
 3. Install the dependencies
  ``` npm i ```
  
 4. Create config folder and add a file *keys.js* with 
   following code-
  ```
  module.exports ={
    MongoURI: <your_key>,
    }
  ```
5. Start the server
   ```npm start ```

