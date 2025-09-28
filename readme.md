# Job Portal Application

This is a job portal application built with React for the frontend and Node.js with Express for the backend. The application allows users to browse job listings, apply for jobs, and manage their applications.

## Features

User:

- User authentication (sign up, log in, log out)
- Browse job listings
- Search and filter jobs by category, location, and keywords
- Apply for jobs
- View and manage job applications

Recruiter:

- Recruiter authentication (log in, log out)
- Post new job listings (create)
- Manage job listings (edit, delete)
- View applications for posted jobs
- Update the status of applications (e.g., review, accept, reject)

Admin:

- Admin authentication (log in, log out)
- Manage recruiters (create, update, view, delete)
- Manage companies (create, update, view, delete)
- Assign recruiters to companies

Example Company Create Request:

```json
{
  "name": "Tech Innovators Inc.",
  "description": "A leading company in tech innovation, specializing in AI and machine learning solutions.",
  "location": "San Francisco, CA",
  "website": "https://www.techinnovators.com",
  "industry": "Information Technology",
  "size": "201-500",
  "foundedYear": 2010
}
```

```json
{
  "name": "Health Solutions Ltd.",
  "description": "A healthcare company focused on providing innovative health tech solutions.",
  "location": "New York, NY",
  "website": "https://www.healthsolutions.com",
  "industry": "Healthcare",
  "size": "51-200",
  "foundedYear": 2015
}
```

```json
{
  "name": "Eco Green Corp.",
  "description": "A company dedicated to sustainable energy solutions and environmental conservation.",
  "location": "Austin, TX",
  "website": "https://www.ecogreencorp.com",
  "industry": "Renewable Energy",
  "size": "11-50",
  "foundedYear": 2018
}
```