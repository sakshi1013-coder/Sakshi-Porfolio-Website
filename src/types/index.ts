export interface IProfile {
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

export interface IProject {
    _id: string;
    title: string;
    description: string;
    imageUrls: string[]; // Changed from imageUrl to imageUrls to match code
    tags: string[];
    liveLink?: string; // Changed from demoUrl
    githubLink?: string; // Changed from repoUrl
    createdAt?: Date;
}

export interface ISkill {
    _id: string;
    name: string;
    category: 'Frontend' | 'Backend' | 'Databases' | 'Programming Languages' | 'Tools' | 'Other';
    icon: string; // React-Icons name
    proficiency?: number; // Added proficiency
}

export interface IMessage {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}
