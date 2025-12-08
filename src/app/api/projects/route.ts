import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export async function GET() {
    try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projects = querySnapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));
        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const docRef = await addDoc(collection(db, 'projects'), body);
        return NextResponse.json({ success: true, data: { _id: docRef.id, ...body } }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 400 });
    }
}
