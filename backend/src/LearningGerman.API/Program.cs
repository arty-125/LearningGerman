using LearningGerman.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// ─── Bind to PORT env var (Railway injects this at runtime) ──────────────────
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

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

// CORS: allow dev server + production frontend URL (set ALLOWED_ORIGIN env var on Railway)
var allowedOrigins = new[]
{
    "http://localhost:4200",
    Environment.GetEnvironmentVariable("ALLOWED_ORIGIN") ?? string.Empty
}
.Where(o => !string.IsNullOrEmpty(o))
.ToArray();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AppCors", policy =>
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// ─── Middleware pipeline ────────────────────────────────────────────────────

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AppCors");
app.UseAuthorization();
app.MapControllers();

app.Run();
