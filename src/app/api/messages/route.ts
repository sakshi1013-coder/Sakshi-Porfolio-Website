import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, orderBy, query } from 'firebase/firestore';

export async function GET() {
    try {
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const messages = querySnapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));
        return NextResponse.json({ success: true, data: messages });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const docRef = await addDoc(collection(db, 'messages'), {
            ...body,
            createdAt: new Date()
        });
        return NextResponse.json({ success: true, data: { _id: docRef.id, ...body } }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create message' }, { status: 400 });
    }
}
