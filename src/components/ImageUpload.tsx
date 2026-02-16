'use client';

import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { Upload, X, Check, Loader2 } from 'lucide-react';

interface ImageUploadProps {
    onUploadComplete: (url: string) => void;
    folder?: string;
    currentImage?: string;
    label?: string;
}

export default function ImageUpload({
    onUploadComplete,
    folder = 'uploads',
    currentImage,
    label = "Upload Image"
}: ImageUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];

            // Validate file type
            if (!selectedFile.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }

            // Validate file size (e.g., max 5MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                return;
            }

            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setError(null);
            setSuccess(false);
            setProgress(0);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError(null);

        try {
            // Create a unique filename to avoid overwrites
            const timestamp = Date.now();
            const filename = `${folder}/${timestamp}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(prog);
                },
                (err) => {
                    console.error("Upload error:", err);
                    setError(`Upload failed: ${err.message}`);
                    setUploading(false);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        onUploadComplete(downloadURL);
                        setSuccess(true);
                        setUploading(false);
                        setFile(null); // Clear file selection
                        setPreview(null);
                    } catch (err) {
                        console.error("Error getting download URL:", err);
                        setError("Failed to get image URL");
                        setUploading(false);
                    }
                }
            );
        } catch (err: any) {
            console.error("Upload initialization error:", err);
            setError(err.message || "Failed to start upload");
            setUploading(false);
        }
    };

    const clearSelection = () => {
        setFile(null);
        setPreview(currentImage || null);
        setError(null);
        setSuccess(false);
        setProgress(0);
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-bold text-midnight/80 mb-2">{label}</label>

            <div className={`border-2 border-dashed rounded-xl p-6 transition-colors ${file ? 'border-marigold bg-marigold/5' : 'border-gray-300 hover:border-marigold/50'
                }`}>
                <div className="flex flex-col items-center justify-center space-y-4">
                    {preview ? (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            {file && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        clearSelection();
                                    }}
                                    className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-gray-600 hover:text-red-500 hover:bg-white"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            <Upload size={32} />
                        </div>
                    )}

                    <div className="w-full text-center">
                        <input
                            type="file"
                            id={`image-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={uploading}
                        />

                        {!file ? (
                            <label
                                htmlFor={`image-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
                                className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-marigold bg-marigold/10 rounded-lg hover:bg-marigold/20 transition-colors"
                            >
                                <Upload size={16} className="mr-2" />
                                Select Image
                            </label>
                        ) : (
                            !success && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleUpload();
                                    }}
                                    disabled={uploading}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-marigold rounded-lg hover:bg-marigold/90 transition-colors disabled:opacity-50"
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 size={16} className="mr-2 animate-spin" />
                                            Uploading... {Math.round(progress)}%
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={16} className="mr-2" />
                                            Upload Now
                                        </>
                                    )}
                                </button>
                            )
                        )}

                        {success && (
                            <div className="text-green-600 font-medium text-sm mt-2 flex items-center justify-center">
                                <Check size={16} className="mr-1" />
                                Image uploaded successfully!
                            </div>
                        )}

                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
