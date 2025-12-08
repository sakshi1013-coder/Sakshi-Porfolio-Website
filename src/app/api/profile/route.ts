import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Profile from '@/models/Profile';

export async function GET() {
    try {
        await dbConnect();
        let profile = await Profile.findOne();
        if (!profile) {
            // Return default empty profile if none exists
            return NextResponse.json({ success: true, data: {} });
        }
        return NextResponse.json({ success: true, data: profile });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch profile' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        // Upsert profile
        const profile = await Profile.findOneAndUpdate({}, body, {
            new: true,
            upsert: true,
            runValidators: true,
        });
        return NextResponse.json({ success: true, data: profile });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update profile' }, { status: 400 });
    }
}
