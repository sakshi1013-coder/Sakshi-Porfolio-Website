import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    tags: string[];
    imageUrls: string[];
    liveLink?: string;
    githubLink?: string;
    createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    imageUrls: { type: [String], default: [] },
    liveLink: { type: String },
    githubLink: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
