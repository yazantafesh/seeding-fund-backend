# seeding-fund-backend

This project is a web development assignment for InfoGraph

- **Author** : Yazan Tafesh

- ### Description

A company called “seedingfund” that funding projects and looking to create projects management system. Users will be able to register, login, send a funding request with their project details and check the status of the funding request of the project. Admins should login and see all funding requests.

---

- ### [Front End Repo](https://github.com/yazantafesh/seeding-fund-frontend)

---

- ### Deploy links

  - [Deployment](https://seeding-fund.herokuapp.com/)

---

- ### Getting this app

  - Clone and npm i
  - npm start or nodemon

---

- ### Setup

  `.env requirements`

  - `PORT` - Port Number
  - `DATABASE` - mongo link
  - `SECRET` - a password

---

- ### End points

  - post `/sign/up`

  - body ` {"email": "yazantafesh1@gmail.com","password": "1234","firstName":"Yazan", "lastName":"Tafesh", "role": "admin"}`

  ```
  {
    "token": "any"
  }

  ```

  - post `/sign/in`

  - basic auth `{ email: 'yazantafesh1@gmail.com', password: '1234'};`

  ```
  {
    "token": "any"
  }

  ```

  - get `/read?email=any@any.com`

  - barear auth  ` "token": "any"`

  ```

  {
  email: 'first',
  firstName: 'Saeed',
  lastName: 'Tafesh',
  role: 'projectOwner',
  projects: [
    {
      name: 'Project One',
      description: 'Description',
      sector: 'Health',
      requiredFunding: '10000',
      urgency: 'Urgent',
      status: 'Pending',
      _id: new ObjectId("615a08b954e781878ef390e1")
    },
    {
      name: 'Project Two',
      description: 'dasdasf',
      sector: 'Education',
      requiredFunding: '1234',
      urgency: 'Urgent',
      status: 'Pending',
      _id: new ObjectId("615a08f554e781878ef390e7")
    },
    {
      name: 'three',
      description: '123',
      sector: 'Energy',
      requiredFunding: '123',
      urgency: 'false',
      status: 'Pending',
      _id: new ObjectId("615a0e1bc80c2861b37bd61b")
    }
  ]
  }

  ```

  - post `/create`

  - barear auth  ` "token": "any"`

  - body ` {name: "name",	description: "description",	sector: "sector",requiredFunding: "requiredFunding",urgency: "urgency",email: "email"}`

  ```

  {
  email: 'first',
  firstName: 'Saeed',
  lastName: 'Tafesh',
  role: 'projectOwner',
  projects: [
    {
      name: 'Project One',
      description: 'Description',
      sector: 'Health',
      requiredFunding: '10000',
      urgency: 'Urgent',
      status: 'Pending',
      _id: new ObjectId("615a08b954e781878ef390e1")
    },
    {
      name: 'Project Two',
      description: 'dasdasf',
      sector: 'Education',
      requiredFunding: '1234',
      urgency: 'Urgent',
      status: 'Pending',
      _id: new ObjectId("615a08f554e781878ef390e7")
    },
    {
      name: 'three',
      description: '123',
      sector: 'Energy',
      requiredFunding: '123',
      urgency: 'false',
      status: 'Pending',
      _id: new ObjectId("615a0e1bc80c2861b37bd61b")
    },
    {
      name: 'test project',
      description: 'test',
      sector: 'Education',
      requiredFunding: '123',
      urgency: 'Urgent',
      status: 'Pending',
      _id: new ObjectId("615a1e46330d4c2b9627e787")
    }
  ]
  }

  ```

  - put `/update`

  - barear auth  ` "token": "any"`

  - body ` {name: "name",	email: "email", status: "status"}`

  ```

  {
  'updated'
  }

  ```

  - delete `/delete`

  - barear auth  ` "token": "any"`

  - body ` {name: "Project One",	email: "first"}`

  ```

  {
  email: 'first',
  firstName: 'Saeed',
  lastName: 'Tafesh',
  role: 'projectOwner',
  projects: [
    {
      name: 'Project Two',
      description: 'dasdasf',
      sector: 'Education',
      requiredFunding: '1234',
      urgency: 'Urgent',
      status: 'Pending',
      _id: new ObjectId("615a08f554e781878ef390e7")
    },
    {
      name: 'three',
      description: '123',
      sector: 'Energy',
      requiredFunding: '123',
      urgency: 'false',
      status: 'Pending',
      _id: new ObjectId("615a0e1bc80c2861b37bd61b")
    },
    {
      name: 'test project',
      description: 'test',
      sector: 'Education',
      requiredFunding: '123',
      urgency: 'Urgent',
      status: 'Pending',
      _id: new ObjectId("615a1e46330d4c2b9627e787")
    }
  ]
  }

  ```
