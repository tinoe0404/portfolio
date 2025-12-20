export async function GET() {
    return new Response('User-agent: *\nDisallow: /admin/', {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }