# Spidery UI Template

This template provides an easy way to spin up a UI for Spidery using React. It includes a pre-built component that interacts with the Spidery API, allowing you to quickly set up a web crawling and scraping interface.

## ⚠️ Important Security Notice

**This template exposes Spidery API keys in the client-side code. For production use, it is strongly recommended to move API interactions to a server-side implementation to protect your API keys.**

## Prerequisites

- Node.js (v14 or later recommended)
- npm

## Getting Started

1. Install dependencies:

   ```
   npm install
   ```

2. Set up your Spidery API key:
   Open `src/components/ingestion.tsx` and replace the placeholder API key:

   ```typescript
   const SPIDERY_API_KEY = "your-api-key-here";
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open your browser and navigate to the port specified in your terminal

## Customization

The main Spidery component is located in `src/components/ingestion.tsx`. You can modify this file to customize the UI or add additional features.

## Security Considerations

For production use, consider the following security measures:

1. Move API interactions to a server-side implementation to protect your Spidery API key.
2. Implement proper authentication and authorization for your application.
3. Set up CORS policies to restrict access to your API endpoints.

## Learn More

For more information about Spidery and its API, visit the [Spidery documentation](https://docs.spidery.khulnasoft.com/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

The Spidery Ingestion UI Template is licensed under the MIT License. This means you are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the SDK, subject to the following conditions:

- The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Please note that while this SDK is MIT licensed, it is part of a larger project which may be under different licensing terms. Always refer to the license information in the root directory of the main project for overall licensing details.
