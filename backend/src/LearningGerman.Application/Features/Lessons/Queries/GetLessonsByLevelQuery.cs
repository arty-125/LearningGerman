using LearningGerman.Application.Common.Interfaces;
using LearningGerman.Application.Common.Models;
using LearningGerman.Application.Features.Lessons.DTOs;
using LearningGerman.Domain.Common;

namespace LearningGerman.Application.Features.Lessons.Queries;

public sealed record GetLessonsByLevelQuery(GermanLevel Level);

public sealed class GetLessonsByLevelHandler(IUnitOfWork unitOfWork)
{
    public async Task<Result<IReadOnlyList<LessonSummaryDto>>> HandleAsync(
        GetLessonsByLevelQuery query,
        CancellationToken ct = default)
    {
        var lessons = await unitOfWork.Lessons.GetByLevelAsync(query.Level, ct);

        var dtos = lessons
            .OrderBy(l => l.Order)
            .Select(l => new LessonSummaryDto(
                l.Id,
                l.Title,
                l.ShortDescription,
                l.Order,
                l.EstimatedMinutes,
                l.TopicId,
                l.CategoryId,
                l.LevelId))
            .ToList()
            .AsReadOnly();

        return Result<IReadOnlyList<LessonSummaryDto>>.Success(dtos);
    }
}
