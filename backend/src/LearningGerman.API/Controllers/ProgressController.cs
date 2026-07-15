using LearningGerman.Application.Features.Progress.Commands;
using LearningGerman.Application.Features.Progress.DTOs;
using LearningGerman.Application.Common.Interfaces;
using LearningGerman.Domain.Common;
using Microsoft.AspNetCore.Mvc;

namespace LearningGerman.API.Controllers;

public class ProgressController(
    UpdateProgressHandler updateHandler,
    IUnitOfWork unitOfWork) : BaseController
{
    /// <summary>Records or updates a user's lesson completion.</summary>
    [HttpPost]
    public async Task<IActionResult> UpdateProgress(
        [FromBody] UpdateProgressRequest request,
        CancellationToken ct)
    {
        var result = await updateHandler.HandleAsync(
            new UpdateProgressCommand(request.UserId, request.LessonId, request.Score), ct);

        return result.IsSuccess ? NoContent() : BadRequest(result.Error);
    }

    /// <summary>Gets the progress summary for a user.</summary>
    [HttpGet("{userId:guid}")]
    public async Task<IActionResult> GetUserProgress(Guid userId, CancellationToken ct)
    {
        var progressList = await unitOfWork.Progress.GetByUserAsync(userId, ct);

        var dto = new UserProgressSummaryDto(
            userId,
            progressList.Count(p => p.Status == CompletionStatus.Completed),
            progressList.Sum(p => p.Attempts),
            progressList.Select(p => new ProgressDto(
                p.UserId, p.LessonId, p.Status, p.Score, p.Attempts, p.CompletedAt))
            .ToList().AsReadOnly());

        return Ok(dto);
    }
}

public sealed record UpdateProgressRequest(Guid UserId, Guid LessonId, int Score);
