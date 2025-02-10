// resources/js/Pages/Elephants/Create.tsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        age: '',
        species: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/elephants');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Elephant
                </h2>
            }
        >
            <Head title="Create Elephant" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <form
                        onSubmit={handleSubmit}
                        className="rounded bg-white p-6 shadow"
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                            {errors.name && (
                                <div className="text-red-500">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Age</label>
                            <input
                                type="number"
                                value={data.age}
                                onChange={(e) => setData('age', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                            {errors.age && (
                                <div className="text-red-500">{errors.age}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Species
                            </label>
                            <input
                                type="text"
                                value={data.species}
                                onChange={(e) =>
                                    setData('species', e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                            {errors.species && (
                                <div className="text-red-500">
                                    {errors.species}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.description && (
                                <div className="text-red-500">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-blue-500 px-4 py-2 text-white"
                        >
                            Create Elephant
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
