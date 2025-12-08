'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Wrench, MessageSquare, User, LogOut } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Skills', href: '/admin/skills', icon: Wrench },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Profile', href: '/admin/profile', icon: User },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/login');
    };

    return (
        <div className="flex flex-col w-64 bg-midnight text-lionsmane min-h-screen border-r border-white/10 transition-colors duration-500">
            <div className="flex items-center justify-center h-16 border-b border-white/10">
                <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${isActive
                                ? 'bg-white/10 text-white shadow-glass'
                                : 'text-lionsmane/70 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-400 hover:bg-white/5 hover:text-red-300 rounded-xl transition-colors duration-300"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </button>
            </div>
        </div>
    );
}
