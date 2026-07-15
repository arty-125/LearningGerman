using LearningGerman.Application.Common.Interfaces;
using LearningGerman.Application.Common.Models;
using LearningGerman.Application.Features.Lessons.DTOs;

namespace LearningGerman.Application.Features.Lessons.Queries;

public sealed record GetLessonByIdQuery(Guid LessonId);

public sealed class GetLessonByIdHandler(IUnitOfWork unitOfWork)
{
    public async Task<Result<LessonDto>> HandleAsync(
        GetLessonByIdQuery query,
        CancellationToken ct = default)
    {
        var lesson = await unitOfWork.Lessons.GetWithExercisesAsync(query.LessonId, ct);

        if (lesson is null)
            return Result<LessonDto>.Failure($"Lesson '{query.LessonId}' not found.");

        var dto = new LessonDto(
            lesson.Id,
            lesson.Title,
            lesson.ShortDescription,
            lesson.Order,
            lesson.EstimatedMinutes,
            lesson.TopicId,
            lesson.CategoryId,
            lesson.LevelId,
            lesson.ContentJson,
            lesson.Exercises
                .OrderBy(e => e.Order)
                .Select(e => new ExerciseSummaryDto(e.Id, e.Type, e.Question, e.Instruction, e.Order))
                .ToList()
                .AsReadOnly());

        return Result<LessonDto>.Success(dto);
    }
}
