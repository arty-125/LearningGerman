using Microsoft.AspNetCore.Mvc;

namespace LearningGerman.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public abstract class BaseController : ControllerBase
{
    protected IActionResult OkOrNotFound<T>(T? value) =>
        value is null ? NotFound() : Ok(value);
}
