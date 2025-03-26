import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dbPath = './db.json';

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
  const departmentId = parseInt(req.params.id);
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
  const newDepartment = {
    id: db.departments.length > 0 ? Math.max(...db.departments.map(d => d.id)) + 1 : 1,
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
  const departmentId = parseInt(req.params.id);
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
  const departmentId = parseInt(req.params.id);
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
  const activityId = parseInt(req.params.id);
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
  const newActivity = {
    id: db.activities.length > 0 ? Math.max(...db.activities.map(a => a.id)) + 1 : 1,
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
  const activityId = parseInt(req.params.id);
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
  const activityId = parseInt(req.params.id);
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

// NOT FOUND ENDPOINT
app.use((req, res) => {
  res.status(404).send('Not Found');
  console.log(`[LOG] Path: ${req.method} ${req.url} | Status: 404 | Success: false | Error: Not Found`);
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
