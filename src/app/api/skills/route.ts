import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export async function GET() {
    try {
        const querySnapshot = await getDocs(collection(db, 'skills'));
        const skills = querySnapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));
        return NextResponse.json({ success: true, data: skills });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch skills' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const docRef = await addDoc(collection(db, 'skills'), body);
        return NextResponse.json({ success: true, data: { _id: docRef.id, ...body } }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create skill' }, { status: 400 });
    }
}
