// resources/js/Pages/Elephants/Index.tsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface Elephant {
    id: number;
    name: string;
    age: number;
    species: string;
}

export default function Index({ elephants }: { elephants: Elephant[] }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Elephants
                </h2>
            }
        >
            <Head title="Elephants" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Link
                                href="/elephants/create"
                                className="mb-4 inline-block rounded bg-blue-500 px-4 py-2 text-white"
                            >
                                Create New Elephant
                            </Link>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Species</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {elephants.map((elephant) => (
                                        <tr key={elephant.id}>
                                            <td>{elephant.name}</td>
                                            <td>{elephant.age}</td>
                                            <td>{elephant.species}</td>
                                            <td>
                                                <Link
                                                    href={`/elephants/${elephant.id}/edit`}
                                                    className="mr-2 text-blue-500"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={`/elephants/${elephant.id}`}
                                                    className="text-green-500"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
