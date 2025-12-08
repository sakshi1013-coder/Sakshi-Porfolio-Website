import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function GET() {
    try {
        const docRef = doc(db, 'profile', 'main');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return NextResponse.json({ success: true, data: docSnap.data() });
        } else {
            return NextResponse.json({ success: true, data: {} });
        }
    } catch (error: any) {
        console.error('Profile API Error:', error);
        return NextResponse.json({ success: false, error: error.message || 'Failed to fetch profile', details: JSON.stringify(error) }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const docRef = doc(db, 'profile', 'main');

        // Merge true allows updating fields without overwriting the whole doc if we wanted, 
        // but for profile update usually we send the whole form. 
        // Using setDoc with merge: true acts like upsert.
        await setDoc(docRef, body, { merge: true });

        return NextResponse.json({ success: true, data: body });
    } catch (error) {
        console.error('Profile Update Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to update profile' }, { status: 400 });
    }
}
