using LearningGerman.Application.Common.Interfaces;
using LearningGerman.Application.Common.Models;

namespace LearningGerman.Application.Features.Progress.Commands;

public sealed record UpdateProgressCommand(
    Guid UserId,
    Guid LessonId,
    int Score); // 0–100

public sealed class UpdateProgressHandler(IUnitOfWork unitOfWork)
{
    public async Task<Result> HandleAsync(
        UpdateProgressCommand command,
        CancellationToken ct = default)
    {
        if (command.Score is < 0 or > 100)
            return Result.Failure("Score must be between 0 and 100.");

        var existing = await unitOfWork.Progress.GetByUserAndLessonAsync(
            command.UserId, command.LessonId, ct);

        if (existing is not null)
        {
            existing.MarkComplete(command.Score);
            unitOfWork.Progress.Update(existing);
        }
        else
        {
            var lesson = await unitOfWork.Lessons.GetByIdAsync(command.LessonId, ct);
            if (lesson is null)
                return Result.Failure($"Lesson '{command.LessonId}' not found.");

            var progress = Domain.Entities.UserProgress.Create(command.UserId, command.LessonId);
            progress.MarkComplete(command.Score);
            await unitOfWork.Progress.AddAsync(progress, ct);
        }

        await unitOfWork.SaveChangesAsync(ct);
        return Result.Success();
    }
}
