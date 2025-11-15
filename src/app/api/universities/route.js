import connectDB from '@/lib/mongoose';
import University from '@/models/University';

export async function GET(request) {
  try {
    await connectDB();

    const universities = await University.find({}).sort({ createdAt: -1 });

    return Response.json(universities, { status: 200 });
  } catch (error) {
    console.error('Error fetching universities:', error);
    return Response.json(
      { error: 'Failed to fetch universities' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate that at least one field is provided (optional as per requirements)
    if (
      !body.universityName &&
      !body.country &&
      !body.courseName &&
      !body.deadline &&
      !body.additionalInfo
    ) {
      return Response.json(
        { error: 'Please provide at least one field' },
        { status: 400 }
      );
    }

    // Check for duplicates
    const existingEntry = await University.findOne({
      universityName: body.universityName,
      country: body.country,
      courseName: body.courseName,
    });

    if (existingEntry) {
      return Response.json(
        { error: 'This university entry already exists' },
        { status: 409 }
      );
    }

    const university = new University(body);
    const savedUniversity = await university.save();

    return Response.json(savedUniversity, { status: 201 });
  } catch (error) {
    console.error('Error creating university:', error);
    return Response.json(
      { error: 'Failed to create university entry' },
      { status: 500 }
    );
  }
}
