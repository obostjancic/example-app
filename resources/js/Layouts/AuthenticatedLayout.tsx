// resources/js/Layouts/AuthenticatedLayout.tsx
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ user?: User; header?: ReactNode }>) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            {/* Dashboard Link */}
                            <div className="flex shrink-0 items-center">
                                <Link
                                    href="/dashboard"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Dashboard
                                </Link>
                            </div>

                            {/* Elephants Link */}
                            <div className="ml-4 flex shrink-0 items-center">
                                <Link
                                    href="/elephants"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Elephants
                                </Link>
                            </div>
                        </div>
                        {/* Rest of the existing layout */}
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
