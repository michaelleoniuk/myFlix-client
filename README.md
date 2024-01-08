MyFlix App was created based on below Design Criteria:

User Stories
● As a user, I want to be able to access information about movies so that I can learn more
about movies I’ve watched or am interested in.
● As a user, I want to be able to create a profile so I can save data about my favorite movies.

Users can find some early movies from Denzel Washington's career.

App is available online: https://myflix-denzelwashington.netlify.app/

The following feature requirements were extracted from the user stories just listed.

Main view
● Returns ALL movies to the user (each movie item with an image, title, and description)
● Filtering the list of movies with a “search” feature
● Ability to select a movie for more details
● Ability to log out
● Ability to navigate to Profile view

Single Movie view
● Returns data (description, genre, director, image) about a single movie to the user
● Allows users to add a movie to their list of favorites

Login view
● Allows users to log in with a username and password

Signup view
● Allows new users to register (username, password, email, date of birth)

Profile view
● Displays user registration details
● Allows users to update their info (username, password, email, date of birth)
● Displays favorite movies
● Allows users to remove a movie from their list of favorites
● Allows existing users to deregister

Technical Requirements
● The application is a single-page application (SPA)
● The application use state routing to navigate between views and share URLs
● The application give users option to filter movies using a “search” feature
● The application use Parcel as its build tool
● The application is written using the React library and in ES2015+
● The application use Bootstrap as a UI library for styling and responsiveness
● The application contain function components
● The application is be hosted online
