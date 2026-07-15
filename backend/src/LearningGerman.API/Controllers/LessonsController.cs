using LearningGerman.Application.Features.Lessons.Queries;
using LearningGerman.Domain.Common;
using Microsoft.AspNetCore.Mvc;

namespace LearningGerman.API.Controllers;

public class LessonsController(
    GetLessonsByLevelHandler byLevelHandler,
    GetLessonByIdHandler byIdHandler) : BaseController
{
    /// <summary>Gets all lessons for a given CEFR level.</summary>
    [HttpGet("level/{level}")]
    public async Task<IActionResult> GetByLevel(
        GermanLevel level, CancellationToken ct)
    {
        var result = await byLevelHandler.HandleAsync(
            new GetLessonsByLevelQuery(level), ct);

        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Error);
    }

    /// <summary>Gets a single lesson with all its exercises.</summary>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var result = await byIdHandler.HandleAsync(
            new GetLessonByIdQuery(id), ct);

        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Error);
    }
}
