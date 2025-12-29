import { NextResponse } from 'next/server';
import { getCV } from '@/lib/actions';

export async function GET() {
  try {
    const cv = await getCV();

    if (!cv?.cvUrl) {
      return new NextResponse('CV not found', { status: 404 });
    }

    // Fetch from Supabase Storage
    const response = await fetch(cv.cvUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch from storage: ${response.statusText}`);
    }

    // Create a pass-through stream
    // We set Content-Disposition to "attachment" to force the download dialog
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${cv.cvFileName || 'CV.pdf'}"`);

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Download error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}