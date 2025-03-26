import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dbPath = './api/db.json';

// Function to read the database
const readDb = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return {
      departments: [],
      activities: [],
      tasks: [],
      projects: [],
      users: [],
      clients: []
    }
  }
};

// Function to write to the database
const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET all departments
app.get('/departments', (req, res) => {
  const db = readDb();
  res.json({ data: db.departments });
  console.log(`[LOG] Path: GET /departments | Status: 200 | Success: true`);
});

// GET a specific department by ID
app.get('/departments/:id', (req, res) => {
  const db = readDb();
  const departmentId = req.params.id;
  const department = db.departments.find(d => d.id === departmentId);

  if (department) {
    res.json({ data: department });
    console.log(`[LOG] Path: GET /departments/${departmentId} | Status: 200 | Success: true`);
  } else {
    res.status(404).send('Department not found');
    console.log(`[LOG] Path: GET /departments/${departmentId} | Status: 404 | Success: false | Error: Department not found`);
  }
});

// POST a new department
app.post('/departments', (req, res) => {
  const db = readDb();
  const id = db.departments.length > 0 ? Math.max(...db.departments.map(d => d.id)) + 1 : 1
  const newDepartment = {
    id: id.toString(),
    name: req.body.name
  };
  db.departments.push(newDepartment);
  writeDb(db);
  res.status(201).json({ data: newDepartment });
  console.log(`[LOG] Path: POST /departments | Status: 201 | Success: true | ID: ${newDepartment.id}`);
});

// PUT (update) an existing department
app.put('/departments/:id', (req, res) => {
  const db = readDb();
  const departmentId = req.params.id;
  const departmentIndex = db.departments.findIndex(d => d.id === departmentId);

  if (departmentIndex > -1) {
    db.departments[departmentIndex] = { id: departmentId, name: req.body.name };
    writeDb(db);
    res.json({ data: { id: departmentId, name: req.body.name } });
    console.log(`[LOG] Path: PUT /departments/${departmentId} | Status: 200 | Success: true`);
  } else {
    res.status(404).send('Department not found');
    console.log(`[LOG] Path: PUT /departments/${departmentId} | Status: 404 | Success: false | Error: Department not found`);
  }
});

// DELETE a department
app.delete('/departments/:id', (req, res) => {
  const db = readDb();
  const departmentId = req.params.id;
  const initialLength = db.departments.length;
  db.departments = db.departments.filter(d => d.id !== departmentId);
  
  if (initialLength > db.departments.length) {
    writeDb(db);
    res.status(204).send();
    console.log(`[LOG] Path: DELETE /departments/${departmentId} | Status: 204 | Success: true`);
  } else {
    res.status(404).send('Department not found');
    console.log(`[LOG] Path: DELETE /departments/${departmentId} | Status: 404 | Success: false | Error: Department not found`);
  }
});


/************************************************************************************************ */
/**************************************ACTIVITIES ENDPOINTS ************************************** */
/************************************************************************************************ */

// GET all activities
app.get('/activities', (req, res) => {
  const db = readDb();
  res.json({ data: db.activities });
  console.log(`[LOG] Path: GET /activities | Status: 200 | Success: true`);
});

// GET a specific activity by ID
app.get('/activities/:id', (req, res) => {
  const db = readDb();
  const activityId = req.params.id;
  const activity = db.activities.find(a => a.id === activityId);

  if (activity) {
    res.json({ data: activity });
    console.log(`[LOG] Path: GET /activities/${activityId} | Status: 200 | Success: true`);
  } else {
    res.status(404).send('Activity not found');
    console.log(`[LOG] Path: GET /activities/${activityId} | Status: 404 | Success: false | Error: Activity not found`);
  }
});

// POST a new activity
app.post('/activities', (req, res) => {
  const db = readDb();
  const id = db.activities.length > 0 ? Math.max(...db.activities.map(a => a.id)) + 1 : 1
  const newActivity = {
    id: id.toString(),
    department_id: req.body.department_id,
    code: req.body.code,
    description: req.body.description,
  };
  db.activities.push(newActivity);
  writeDb(db);
  res.status(201).json({ data: newActivity });
  console.log(`[LOG] Path: POST /activities | Status: 201 | Success: true | ID: ${newActivity.id}`);
});

// PUT (update) an existing activity
app.put('/activities/:id', (req, res) => {
  const db = readDb();
  const activityId = req.params.id;
  const activityIndex = db.activities.findIndex(a => a.id === activityId);

  if (activityIndex > -1) {
    db.activities[activityIndex] = { id: activityId, department_id: req.body.department_id, code: req.body.code, description: req.body.description };
    writeDb(db);
    res.json({ data: { id: activityId, department_id: req.body.department_id, code: req.body.code, description: req.body.description } });
    console.log(`[LOG] Path: PUT /activities/${activityId} | Status: 200 | Success: true`);
  } else {
    res.status(404).send('Activity not found');
    console.log(`[LOG] Path: PUT /activities/${activityId} | Status: 404 | Success: false | Error: Activity not found`);
  }
});

// DELETE an activity
app.delete('/activities/:id', (req, res) => {
  const db = readDb();
  const activityId = req.params.id;
  const initialLength = db.activities.length;
  db.activities = db.activities.filter(a => a.id !== activityId);
  
  if (initialLength > db.activities.length) {
    writeDb(db);
    res.status(204).send();
    console.log(`[LOG] Path: DELETE /activities/${activityId} | Status: 204 | Success: true`);
  } else {
    res.status(404).send('Activity not found');
    console.log(`[LOG] Path: DELETE /activities/${activityId} | Status: 404 | Success: false | Error: Activity not found`);
  }
});

/************************************************************************************************ */
/**************************************USERS ENDPOINTS ****************************************** */
/************************************************************************************************ */

// GET all users
app.get('/users', (req, res) => {
  const db = readDb();
  res.json({ data: db.users });
  console.log(`[LOG] Path: GET /users | Status: 200 | Success: true`);
});

// GET a specific user by ID
app.get('/users/:id', (req, res) => {
  const db = readDb();
  const userId = req.params.id;
  const user = db.users.find(u => u.id === userId);

  if (user) {
    res.json({ data: user });
    console.log(`[LOG] Path: GET /users/${userId} | Status: 200 | Success: true`);
  } else {
    res.status(404).send('User not found');
    console.log(`[LOG] Path: GET /users/${userId} | Status: 404 | Success: false | Error: User not found`);
  }
});

// POST a new user
app.post('/users', (req, res) => {
  const db = readDb();
  const id = db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1
  const newUser = {
    id: id.toString(),
    code: req.body.code,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    nss: req.body.nss,
    employer_registration: req.body.employer_registration,
    hire_date: req.body.hire_date,
    daily_salary: req.body.daily_salary,
    department_id: req.body.department_id,
    position: req.body.position,
    cost_center: req.body.cost_center,
    status: 'A',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  db.users.push(newUser);
  writeDb(db);
  res.status(201).json({ data: newUser });
  console.log(`[LOG] Path: POST /users | Status: 201 | Success: true | ID: ${newUser.id}`);
});

// PUT (update) an existing user
app.put('/users/:id', (req, res) => {
  const db = readDb();
  const userId = req.params.id;
  const userIndex = db.users.findIndex(u => u.id === userId);

  if (userIndex > -1) {
    const updatedUser = {
      id: userId,
      code: req.body.code,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      nss: req.body.nss,
      employer_registration: req.body.employer_registration,
      hire_date: req.body.hire_date,
      daily_salary: req.body.daily_salary,
      department_id: req.body.department_id,
      position: req.body.position,
      cost_center: req.body.cost_center,
      status: req.body.status,
      created_at: db.users[userIndex].created_at,
      updated_at: new Date().toISOString()
    };
    db.users[userIndex] = updatedUser;
    writeDb(db);
    res.json({ data: updatedUser });
    console.log(`[LOG] Path: PUT /users/${userId} | Status: 200 | Success: true`);
  } else {
    res.status(404).send('User not found');
    console.log(`[LOG] Path: PUT /users/${userId} | Status: 404 | Success: false | Error: User not found`);
  }
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
  const db = readDb();
  const userId = req.params.id;
  const initialLength = db.users.length;
  db.users = db.users.filter(u => u.id !== userId);
  
  if (initialLength > db.users.length) {
    writeDb(db);
    res.status(204).send();
    console.log(`[LOG] Path: DELETE /users/${userId} | Status: 204 | Success: true`);
  } else {
    res.status(404).send('User not found');
    console.log(`[LOG] Path: DELETE /users/${userId} | Status: 404 | Success: false | Error: User not found`);
  }
});

// NOT FOUND ENDPOINT
app.use((req, res) => {
  res.status(404).send('Not Found');
  console.log(`[LOG] Path: ${req.method} ${req.url} | Status: 404 | Success: false | Error: Not Found`);
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
