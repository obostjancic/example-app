// resources/js/Pages/Elephants/Show.tsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface Elephant {
    id: number;
    name: string;
    age: number;
    species: string;
    description?: string;
}

export default function Show({ elephant }: { elephant: Elephant }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {elephant.name}
                </h2>
            }
        >
            <Head title={elephant.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4">
                            <strong>Name:</strong> {elephant.name}
                        </div>
                        <div className="mb-4">
                            <strong>Age:</strong> {elephant.age}
                        </div>
                        <div className="mb-4">
                            <strong>Species:</strong> {elephant.species}
                        </div>
                        {elephant.description && (
                            <div className="mb-4">
                                <strong>Description:</strong>{' '}
                                {elephant.description}
                            </div>
                        )}
                        <div className="flex space-x-4">
                            <Link
                                href={`/elephants/${elephant.id}/edit`}
                                className="rounded bg-blue-500 px-4 py-2 text-white"
                            >
                                Edit
                            </Link>
                            <Link
                                href="/elephants"
                                className="rounded bg-gray-500 px-4 py-2 text-white"
                            >
                                Back to List
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
