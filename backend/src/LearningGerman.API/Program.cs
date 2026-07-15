using LearningGerman.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// ─── Services ──────────────────────────────────────────────────────────────

builder.Services.AddInfrastructure(builder.Configuration);

// Application feature handlers (registered individually for simplicity)
builder.Services.AddScoped<
    LearningGerman.Application.Features.Lessons.Queries.GetLessonsByLevelHandler>();
builder.Services.AddScoped<
    LearningGerman.Application.Features.Lessons.Queries.GetLessonByIdHandler>();
builder.Services.AddScoped<
    LearningGerman.Application.Features.Progress.Commands.UpdateProgressHandler>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new()
    {
        Title = "Deutsch Lernen API",
        Version = "v1",
        Description = "API for the German learning platform"
    });
});

// CORS: allow the Angular dev server
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// ─── Middleware pipeline ────────────────────────────────────────────────────

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("DevCors");
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
