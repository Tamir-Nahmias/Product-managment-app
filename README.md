# Product Management App

This is a full-stack project I developed as part of a home assignment.  
The system enables full CRUD operations for managing products via a modern Angular interface and a RESTful ASP.NET Core backend.

## Technologies Used

### Backend

- ASP.NET Core 8
- Entity Framework Core (Code First)
- SQL Server

### Frontend

- Angular 20
- TypeScript
- Angular Material
- CSS

## Features

- Product listing with table view
- Create, update, and delete products
- Form validations with Angular Reactive Forms
- Responsive UI using Angular Material
- RESTful API using ASP.NET Core
- Code First approach with automatic DB generation via EF Core
- State management between components using Angular services with BehaviorSubject

---

## Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/Tamir-Nahmias/Product-managment-app.git
cd Product-managment-app
```

### Step 2: Configure SQL Server

Make sure SQL Server is running locally or on a remote machin
then open the file :
` backend/ProductManagementApp/appsettings.json`
and set your connection string as follows :

```"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=your_db_here;Trusted_Connection=True;TrustServerCertificate=True"
}
```

### Step 3: Run EF Core Migrations (Code First)

Navigate to the backend folder:
`cd backend/ProductManagementApp`
If you don't have dotnet-ef installed run the following command:

`dotnet tool install --global dotnet-ef`
then run :
`dotnet ef database update`
to create the database with its schemas

### Step 4: Run the Backend Server

`dotnet run`

### Step 5: Enable CORS for Angular

To allow the Angular frontend to communicate with the API, make sure CORS is enabled in Program.cs:

```builder.Services.AddCors(options =>
{
options.AddPolicy("AllowLocalAngular", policy =>
{
policy.WithOrigins("http://localhost:4200")
.AllowAnyHeader()
.AllowAnyMethod();
});
});

app.UseCors("AllowLocalAngular");
```

### Step 6: Run the Frontend (Angular)

In a new terminal window:

```cd frontend/product-task
npm install
ng serve
```

The app will be available at: http://localhost:4200

Importnant! Make sure this matches the origin defined in the CORS policy.

## Notes

This project uses Entity Framework Code First, so the database schema is generated from the model classes.

Any changes to models should be followed by:

```dotnet ef migrations add YourMigrationName
dotnet ef database update
```

The solution and folder structure are organized clearly into backend/ and frontend/.
