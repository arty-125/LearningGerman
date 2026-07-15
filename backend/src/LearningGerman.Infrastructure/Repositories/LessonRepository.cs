using LearningGerman.Application.Common.Interfaces;
using LearningGerman.Domain.Common;
using LearningGerman.Domain.Entities;
using LearningGerman.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LearningGerman.Infrastructure.Repositories;

public class LessonRepository(AppDbContext context)
    : BaseRepository<Lesson>(context), ILessonRepository
{
    public async Task<IReadOnlyList<Lesson>> GetByLevelAsync(
        GermanLevel level, CancellationToken ct = default)
    {
        var levelEntity = await Context.Levels
            .AsNoTracking()
            .FirstOrDefaultAsync(l => l.GermanLevel == level, ct);

        if (levelEntity is null) return [];

        return await DbSet
            .AsNoTracking()
            .Where(l => l.LevelId == levelEntity.Id)
            .OrderBy(l => l.Order)
            .ToListAsync(ct);
    }

    public async Task<IReadOnlyList<Lesson>> GetByCategoryAsync(
        Guid categoryId, CancellationToken ct = default)
        => await DbSet
            .AsNoTracking()
            .Where(l => l.CategoryId == categoryId)
            .OrderBy(l => l.Order)
            .ToListAsync(ct);

    public async Task<IReadOnlyList<Lesson>> GetByTopicAsync(
        Guid topicId, CancellationToken ct = default)
        => await DbSet
            .AsNoTracking()
            .Where(l => l.TopicId == topicId)
            .OrderBy(l => l.Order)
            .ToListAsync(ct);

    public async Task<Lesson?> GetWithExercisesAsync(
        Guid lessonId, CancellationToken ct = default)
        => await DbSet
            .Include(l => l.Exercises)
            .FirstOrDefaultAsync(l => l.Id == lessonId, ct);
}
