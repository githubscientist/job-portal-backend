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

Example Job Post Create Request:

```json
{
  "title": "Frontend Developer",
  "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building and maintaining the user interface of our web applications.",
  "requirements": [
    "Proficiency in HTML, CSS, and JavaScript",
    "Experience with React.js",
    "Familiarity with RESTful APIs",
    "Strong problem-solving skills",
    "Good communication skills"
  ],
  "salary": "70000-90000",
  "location": "Remote",
  "jobType": "Full-time",
  "experienceLevel": "Mid",
  "skills": ["JavaScript", "React", "CSS", "HTML"],
  "applicationDeadline": "2024-12-31"
}
```

```json
{
  "title": "Backend Developer",
  "description": "We are seeking a Backend Developer to design and implement server-side logic, ensuring high performance and responsiveness to requests from the frontend.",
  "requirements": [
    "Proficiency in Node.js and Express",
    "Experience with database management (SQL and NoSQL)",
    "Familiarity with RESTful APIs",
    "Strong problem-solving skills",
    "Good communication skills"
  ],
  "salary": "80000-100000",
  "location": "New York, NY",
  "jobType": "Full-time",
  "experienceLevel": "Mid",
  "skills": ["Node.js", "Express", "MongoDB", "SQL"],
  "applicationDeadline": "2024-11-30"
}
```

```json
{
  "title": "Data Scientist",
  "description": "We are looking for a Data Scientist to analyze large amounts of raw information to find patterns that will help improve our company.",
  "requirements": [
    "Proficiency in Python and R",
    "Experience with machine learning algorithms",
    "Familiarity with data visualization tools",
    "Strong analytical skills",
    "Good communication skills"
  ],
  "salary": "90000-120000",
  "location": "San Francisco, CA",
  "jobType": "Full-time",
  "experienceLevel": "Senior",
  "skills": ["Python", "R", "Machine Learning", "Data Visualization"],
  "applicationDeadline": "2024-10-31"
}
```
