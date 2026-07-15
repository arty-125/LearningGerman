namespace LearningGerman.Application.Common.Interfaces;

public interface IUnitOfWork
{
    ILessonRepository Lessons { get; }
    IProgressRepository Progress { get; }

    Task<int> SaveChangesAsync(CancellationToken ct = default);
}
