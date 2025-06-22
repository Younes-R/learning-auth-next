## Intro

I am trying to implement basic authentication and authorization in Next.js 15 with RSCs and Server Actions. This app has one public page, and two protected routes you need to be authenticated to get them.

Also, there is two user roles or types: students ans teachers, so each user type has some specific pages the other type cannot get or reach.

## Strategy

This is a JWT authentication flow with one token, stored in an httpOnly cookie.

## Implementation

### Registration

1. First, users need to register in our app; they go to '/register' and fill in the needed information. The form then sends this info as FormData object to a server action called 'register'.
2. 'register' validates the formData object with zod. If there is an error, send it back to the user, else continue
3. In our app, each user has a unique email, so no two users are allowed to have the same email. Search the db for another user with same email from the form data. if found, send an error to the user, else continue
4. We create a JWT token 'in code called refresh token.. but it is not the same refresh token from token rotation'
5. we hash the password
6. create a new user record in db. if there is an error, send it to the user, else continue
7. store the JWT token in a cookie. We specified to be 'httpOnly: not accessible by client side JS, so clients cannot manipulate it'
8. we redirect the user to a protected route: '/student' if the user is student or '/teacher' if the user is a teacher

### Login

1. The user fills in the email and password in the login form which sends them to a server action called 'login'
2. 'login' validates the formData object with zod. If there is an error, send it back to the user, else continue
3. Search the db for another user with same email from the form data. if not found, send the error to the user, else continue
4. compare the hashed form data password with the hash of the real password from db. if they do not match, send the error to the user, else continue
5. create a new JWT token
6. store the token in an httpOnly cookie
7. redirect the user to a protected route

### SignOut

1. This is done with a server action too, called 'SignOut'. We put a 'Sign Out' button in the root layout that should render conditionally when the user is logged in. We attached the server action as an 'onClick' event handler
2. When the button is clicked on, 'SignOut' deletes the cookie containing the JWT token and redirects the user to '/login'

### Protecting Specific Pages

There is some pages that only authenticated users can access, like '/student' and '/teacher' pages. So we need to protect those pages; by checking first if the user is authenticated or not and react depending on this. This is done in a function called 'verifyRefreshToken()'. It works like this:

1. search for the JWT token cookie
2. if not found, redirect to '/login', else continue
3. check if the JWT token is correct: not manipulated and not expired. This is done with bcrypt.verify in the code 'we are using brcyptjs to hash passwords and verify their hashes'. If the token is correct, do nothing 'let the page render its content', else redirect the user to 'login'

this flow resembles an express middleware checking a JWT token!
