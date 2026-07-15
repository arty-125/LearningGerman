using LearningGerman.Application.Common.Interfaces;
using LearningGerman.Infrastructure.Persistence;
using LearningGerman.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LearningGerman.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? "Data Source=learninggerman.db";

        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(connectionString));

        services.AddScoped<ILessonRepository, LessonRepository>();
        services.AddScoped<IProgressRepository, ProgressRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
}
