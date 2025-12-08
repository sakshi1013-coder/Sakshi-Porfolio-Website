import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProfile extends Document {
    name: string;
    title: string;
    bio: string;
    avatarUrl: string;
    resumeUrl?: string;
    socialLinks: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        instagram?: string;
    };
}

const ProfileSchema: Schema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    resumeUrl: { type: String },
    socialLinks: {
        github: String,
        linkedin: String,
        twitter: String,
        instagram: String,
    },
});

// Singleton profile, but we'll just use findOne()
const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
