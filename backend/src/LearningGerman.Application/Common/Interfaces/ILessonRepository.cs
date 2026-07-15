using LearningGerman.Domain.Common;
using LearningGerman.Domain.Entities;

namespace LearningGerman.Application.Common.Interfaces;

public interface ILessonRepository : IRepository<Lesson>
{
    Task<IReadOnlyList<Lesson>> GetByLevelAsync(GermanLevel level, CancellationToken ct = default);
    Task<IReadOnlyList<Lesson>> GetByCategoryAsync(Guid categoryId, CancellationToken ct = default);
    Task<IReadOnlyList<Lesson>> GetByTopicAsync(Guid topicId, CancellationToken ct = default);
    Task<Lesson?> GetWithExercisesAsync(Guid lessonId, CancellationToken ct = default);
}
