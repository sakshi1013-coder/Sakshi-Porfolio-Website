'use client';

import { useEffect, useState } from 'react';
import ProjectForm from '@/components/ProjectForm';
import { IProject } from '@/types';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const [project, setProject] = useState<IProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

    useEffect(() => {
        params.then(setResolvedParams);
    }, [params]);

    useEffect(() => {
        if (!resolvedParams) return;
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${resolvedParams.id}`); // Corrected URL construction
                const data = await res.json();
                if (data.success) {
                    setProject(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch project', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [resolvedParams]);

    if (loading) return <div>Loading...</div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-midnight tracking-tight">Edit Project</h1>
            <ProjectForm initialData={project} isEditing />
        </div>
    );
}
