'use client';

import ProjectForm from '@/components/ProjectForm';

export default function NewProjectPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-midnight tracking-tight">Add New Project</h1>
            <ProjectForm />
        </div>
    );
}
