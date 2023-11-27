using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Xml.Linq;

namespace Base64Encode.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Base64Encode : ControllerBase
    {
        [HttpPost(Name = "encode")]
        public async Task<IActionResult> EncodeText([FromBody] string text)
        {
            var encodedText = Convert.ToBase64String(Encoding.UTF8.GetBytes(text));
            var encodedCharacters = encodedText.ToCharArray();

            foreach (var character in encodedCharacters)
            {
                await Task.Delay(new Random().Next(1000, 5000)); // Simulate random delay between 1-5 seconds
                await SendCharacterAsync(character);
            }

            return Ok("Encoding completed.");
        }

        private async Task SendCharacterAsync(char character)
        {
            // Implement logic for sending the character to the client
            Console.WriteLine($"Sending character: {character}");
        }
    }
}
