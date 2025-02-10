// resources/js/Pages/Dashboard.tsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-semibold">
                                Quick Access
                            </h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <Link
                                    href="/elephants"
                                    className="flex items-center justify-center rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                                >
                                    Manage Elephants
                                </Link>
                                {/* You can add more quick access links here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
