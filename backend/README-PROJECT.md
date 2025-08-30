📄 Pages (Frontend)

These are the core screens your users will interact with.

Page Description

1. Landing Page App intro, login/register buttons, possibly public feature preview.
2. Register Page User signup form.
3. Login Page User login form.
4. Dashboard Page Overview of all user habits, daily streak summary, and analytics.
5. Habit Detail Page GitHub-style grid for one habit, history, stats (current streak, etc).
6. Create/Edit Habit Form to create a new habit or edit an existing one.
7. Settings Page Profile settings (username, password, theme toggle, etc.).
8. 404 / Error Page Optional: for invalid routes or app errors.

backend API Endpoints (Spring Boot)

Here’s a clean, RESTful endpoint structure for scalability and ease of use:

🔐 Auth Endpoints
Method Endpoint Description
POST /api/auth/register Register new user
POST /api/auth/login Login, returns JWT
GET /api/auth/me Get current user info (using token)

User Endpoints
Method Endpoint Description
GET /api/users/{id} Get user profile
PUT /api/users/{id} Update user profile
DELETE /api/users/{id} Delete user account

Habit Endpoints
Method Endpoint Description
GET /api/habits List all habits for current user
POST /api/habits Create new habit
GET /api/habits/{id} Get habit detail
PUT /api/habits/{id} Update habit
DELETE /api/habits/{id} Delete habit

Habit Tracking Endpoints
Method Endpoint Description
POST /api/habits/{habitId}/track Mark habit as done for a date
DELETE /api/habits/{habitId}/track?date=YYYY-MM-DD Unmark a tracked day
GET /api/habits/{habitId}/track Get all tracked dates for a habit
GET /api/habits/{habitId}/stats Get current streak, longest streak

Optional Extras (Advanced but Helpful)
Feature Endpoint or Page Notes
Theme Toggle /api/users/{id}/settings Save dark/light mode in DB
Notifications /api/notifications For future daily reminders
Social Sharing /api/habits/{id}/share Public view of a habit (read-only)
Analytics /api/habits/{id}/analytics More charts or graphs
