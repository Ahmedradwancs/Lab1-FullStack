
# Report on Lab1-Fullstack 

##  Recipes Management System (RMS)

### Challenges Faced

1. **Frontend-Backend Integration:** As this is my first time integrating the frontend (HTML, CSS, JavaScript) with the backend (Node.js, Express, MongoDB) posed an initial challenge. Ensuring seamless communication between the client-side and server-side components was crucial for a functional system.


2. **Dynamic Table Updates:** Dynamically updating the table displaying recipes upon CRUD operations (Create, Read, Update, Delete) required careful handling to avoid inconsistencies and ensure a smooth user experience.
Especially the update operation was a bit tricky as it required many steps to be done in the right order to update the recipe correctly.

3. **MVC Architecture:** I managed to do but not in the best way possible, I could have done it better. I tried implementing a Model-View-Controller (MVC) architecture for the Recipe Management System (RMS), which required a clear separation of concerns between the data model, user interface, and application logic. Ensuring that each component interacted correctly and efficiently was a significant challenge.



---

###  Solutions Implemented

1. **Frontend-Backend Integration:** Utilizing the Fetch API in JavaScript enabled asynchronous communication between the frontend and backend. This allowed me to send HTTP requests to the server, fetching recipe data and updating it seamlessly without page reloads.

2. **Dynamic Table Updates:** By leveraging JavaScript's DOM manipulation capabilities, I dynamically updated the table contents upon successful CRUD operations. This provided users with instant feedback and eliminated the need for manual page refreshes.

3. **MVC Architecture:** I implemented a basic MVC architecture by separating the data model (MongoDB), user interface (HTML, CSS), and application logic (Node.js, Express). This separation of concerns facilitated code organization and maintainability, making it easier to debug and extend the system.

---

### Alternative Approaches

1. **Frontend Frameworks:** While I opted for vanilla JavaScript for simplicity and lightweight performance, using frontend frameworks like React or Vue.js could offer additional benefits such as component reusability, state management, and enhanced code organization. However, this might introduce a steeper learning curve and increased complexity, especially for smaller projects.

2. **Database Selection:** While MongoDB served my needs adequately with its flexibility and scalability, other database options like PostgreSQL or MySQL could be considered for projects requiring more structured data and complex querying capabilities.

3. **Authentication and Authorization:** Integrating user authentication and authorization features would enhance security and allow for personalized user experiences. Implementing OAuth or JWT-based authentication could be explored for future iterations of the RMS.

---

## Conclusion

The development of the Recipes Management System (RMS) provided valuable insights into full-stack web development, frontend-backend integration, and MVC architecture. By overcoming challenges such as dynamic table updates and frontend-backend communication, I gained practical experience in building interactive web applications.

---

## Additional Notes

- Throughout the development process, I prioritized code modularity and readability, adhering to best practices to facilitate future maintenance and expansion.
- No external libraries or frameworks were used in the frontend development of this RMS, keeping the project lightweight and minimizing dependencies and as a requirement of the project.
- MVC architecture was implemented to the best of my understanding and ability in the beginning, with a lot of room for improvement and optimization in future projects.
