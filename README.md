# **Stage Management Platform**

## **Project Description**
This project is a comprehensive platform for the management of academic internships and project defenses. It aims to digitalize and streamline the various administrative processes, including the renovation of existing archives and the management of new internship records, forms, and academic defense schedules.

## **Key Features**
- **Archive Management:** Migrate and modernize the existing internship archive.
- **Internship Process Automation:** Form submission and tracking for supporting documents.
- **Scheduling:** Efficient scheduling and management of academic defenses.
- **User-Friendly Interface:** Developed with Angular and designed using Figma.
- **Secure Authentication:** Role-based access control through Windows Server.

## **Technologies Used**
- **Frontend:** Angular ,Tailwind CSS,
- **Backend:** Node.js, Express.js ,Prisma ,
- **Database:** Postgres SQL ,Redis 
- **Server:** local Server ,Docker
- **Design:** Figma
- **Modeling:** UML

## **Installation Instructions**
1. Clone this repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd StageManagementPlatform
    ```
3. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```
4. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```
5. Set up the MySQL database using the provided schema.
6. Start the development servers:
    - **Backend:**
      ```bash
      npm run start
      ```
    - **Frontend:**
      ```bash
      ng serve
      ```

## **Usage**
- Navigate to the platform's URL.
- Login based on assigned roles (administrator or user).
- Manage stages, submit forms, and track defense schedules.

## **Project Structure**
```
StageManagementPlatform/
├── backend/
├── frontend/
├── database/
└── README.md
```

## **Contributing**
1. Fork the project.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.



