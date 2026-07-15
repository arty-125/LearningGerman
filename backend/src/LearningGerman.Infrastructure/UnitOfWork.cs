using LearningGerman.Application.Common.Interfaces;
using LearningGerman.Infrastructure.Persistence;
using LearningGerman.Infrastructure.Repositories;

namespace LearningGerman.Infrastructure;

public class UnitOfWork(
    AppDbContext context,
    ILessonRepository lessons,
    IProgressRepository progress) : IUnitOfWork
{
    public ILessonRepository Lessons { get; } = lessons;
    public IProgressRepository Progress { get; } = progress;

    public Task<int> SaveChangesAsync(CancellationToken ct = default)
        => context.SaveChangesAsync(ct);
}
