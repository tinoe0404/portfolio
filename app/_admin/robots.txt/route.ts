export async function GET() {
    return new Response('User-agent: *\nDisallow: /_admin/', {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }