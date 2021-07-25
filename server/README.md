## Functions provided by this node backend API

#### GET /employees
- Accepts no arguments
- Returns JSON array of all employees (id, firstName, lastName, email, phoneNumber, title, department, city, state)

#### POST /create
- Accepts single employee object containing firstName, lastName, email, phoneNumber, title, department, city, state

#### POST /update
- Accepts single employee object containing id, firstName, lastName, email, phoneNumber, title, department, city, state

#### POST /delete
- Accepts single employee object containing id, firstName, lastName, email, phoneNumber, title, department, city, state
