using ProductManagementApp.Services;
using ProductManagementApp.Repository;
using ProductManagementApp.Config;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//port for frontend localhost access :
var PORT = 4200;

builder.Services.AddCors(options =>
{
    options.AddPolicy($"allow localhost:{PORT}", policy =>
    {
        policy.WithOrigins($"http://localhost:{PORT}")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<ProductRepo>();
builder.Services.AddControllers();

var app = builder.Build();
app.MapGet("/", () => "Server is up and running");
app.UseCors($"allow localhost:{PORT}");

app.MapControllers();

app.Run();
