import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISkill extends Document {
    name: string;
    category: 'Frontend' | 'Backend' | 'Tools' | 'Other';
    proficiency: number;
    icon?: string;
}

const SkillSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ['Frontend', 'Backend', 'Tools', 'Other'] },
    proficiency: { type: Number, required: true, min: 0, max: 100 },
    icon: { type: String },
});

const Skill: Model<ISkill> = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;
