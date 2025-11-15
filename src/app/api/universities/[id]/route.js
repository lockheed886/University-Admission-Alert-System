import connectDB from '@/lib/mongoose';
import University from '@/models/University';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    await connectDB();

    if (!ObjectId.isValid(params.id)) {
      return Response.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const university = await University.findById(params.id);

    if (!university) {
      return Response.json(
        { error: 'University not found' },
        { status: 404 }
      );
    }

    return Response.json(university, { status: 200 });
  } catch (error) {
    console.error('Error fetching university:', error);
    return Response.json(
      { error: 'Failed to fetch university' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();

    if (!ObjectId.isValid(params.id)) {
      return Response.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();

    const university = await University.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!university) {
      return Response.json(
        { error: 'University not found' },
        { status: 404 }
      );
    }

    return Response.json(university, { status: 200 });
  } catch (error) {
    console.error('Error updating university:', error);
    return Response.json(
      { error: 'Failed to update university' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    if (!ObjectId.isValid(params.id)) {
      return Response.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const university = await University.findByIdAndDelete(params.id);

    if (!university) {
      return Response.json(
        { error: 'University not found' },
        { status: 404 }
      );
    }

    return Response.json(
      { message: 'University deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting university:', error);
    return Response.json(
      { error: 'Failed to delete university' },
      { status: 500 }
    );
  }
}
