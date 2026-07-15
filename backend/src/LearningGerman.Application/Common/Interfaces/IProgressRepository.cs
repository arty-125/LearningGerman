using LearningGerman.Domain.Entities;

namespace LearningGerman.Application.Common.Interfaces;

public interface IProgressRepository : IRepository<UserProgress>
{
    Task<IReadOnlyList<UserProgress>> GetByUserAsync(Guid userId, CancellationToken ct = default);
    Task<UserProgress?> GetByUserAndLessonAsync(Guid userId, Guid lessonId, CancellationToken ct = default);
}
