using LearningGerman.Application.Common.Interfaces;
using LearningGerman.Domain.Entities;
using LearningGerman.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LearningGerman.Infrastructure.Repositories;

public class ProgressRepository(AppDbContext context)
    : BaseRepository<UserProgress>(context), IProgressRepository
{
    public async Task<IReadOnlyList<UserProgress>> GetByUserAsync(
        Guid userId, CancellationToken ct = default)
        => await DbSet
            .AsNoTracking()
            .Where(p => p.UserId == userId)
            .ToListAsync(ct);

    public async Task<UserProgress?> GetByUserAndLessonAsync(
        Guid userId, Guid lessonId, CancellationToken ct = default)
        => await DbSet
            .FirstOrDefaultAsync(p => p.UserId == userId && p.LessonId == lessonId, ct);
}
