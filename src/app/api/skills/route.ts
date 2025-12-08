import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Skill from '@/models/Skill';

export async function GET() {
    try {
        await dbConnect();
        const skills = await Skill.find({});
        return NextResponse.json({ success: true, data: skills });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch skills' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const skill = await Skill.create(body);
        return NextResponse.json({ success: true, data: skill }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create skill' }, { status: 400 });
    }
}
