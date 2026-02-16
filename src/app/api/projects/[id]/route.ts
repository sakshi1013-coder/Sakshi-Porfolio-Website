import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: { _id: docSnap.id, ...docSnap.data() } });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch project' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const docRef = doc(db, 'projects', id);

        await updateDoc(docRef, body);

        // Return updated data (merged)
        return NextResponse.json({ success: true, data: { _id: id, ...body } });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const docRef = doc(db, 'projects', id);

        await deleteDoc(docRef);

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 400 });
    }
}
