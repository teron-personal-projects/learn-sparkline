# Authentication

## What is User Authentication

User authentication is the process of verifying the identity of a user attempting to 
access a system or application. It ensures that the person claiming to be a particular 
user is actually that user. This process typically involves presenting some form of credentials,
 such as a username and password, to prove identity.

## Authentication and Authorization

Authentication is the process of verifying the identity of a user, ensuring that the individual is
who they claim to be. This typically involves presenting credentials such as a username and password.

Authorization, on the other hand, determines the access rights and permissions granted to authenticated
users, specifying what actions or resources they are allowed to access within a system or application. 
While authentication confirms identity, authorization controls what authenticated users are allowed to do.

## Some Methods and Tools Commonly Used to Handle User Authentication.

[This YT video has a good breakdown](https://www.youtube.com/watch?v=UBUNrFtufWo)

1. **JSON Web Tokens (JWT)**: JWT is a compact, URL-safe means of representing claims to be transferred 
between two parties. JWTs are commonly used for authentication and securely transmitting information 
between parties. Libraries like `jsonwebtoken` in Node.js facilitate JWT generation, verification, and usage.

2. **OAuth and OpenID Connect**: These are industry-standard protocols for authorization and authentication. 
OAuth enables secure authorization in a standardized manner, while OpenID Connect is an identity layer built 
on top of OAuth 2.0, providing authentication. Libraries like `passport.js` help integrate OAuth and OpenID 
Connect into JavaScript applications.

3. **Session-based Authentication**: This method involves creating and managing user sessions on the server-side.
Upon successful authentication, a unique session identifier is generated and stored on the server, while a 
corresponding session cookie is sent to the client. Libraries like `express-session` in Node.js simplify 
session management.

4. **Authentication as a Service (AaaS)**: AaaS platforms, such as Auth0 or Firebase Authentication, provide 
pre-built authentication solutions with features like user management, social login, and multi-factor authentication. 
Integration is facilitated through SDKs and APIs.

5. **Third-party Authentication Providers**: JavaScript applications can leverage authentication providers like Google, 
Facebook, or GitHub for user authentication. These providers offer OAuth-based authentication mechanisms, often via 
SDKs or APIs for easy integration.

---

## Sessions and Cookies

Servers need a way to track users from page to page, this is where sessions and cookies come into play.

### Session

A session represents one visit to one site by a browser. With programming a server can create a session ID when a visit
logins into the site. The session ID identifies that browser and last for a set time, after it's destroyed.  

The server can save extra info along with the ID.

## Cookies

A Key/Value Pair that saves any info that the website chooses to save.
A server can create, read, update, and delete from a cookie.

I this project we only need the cookie to save the users session id.

## OAuth2.0

