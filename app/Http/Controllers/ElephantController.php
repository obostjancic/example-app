<?php

namespace App\Http\Controllers;

use App\Models\Elephant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ElephantController extends Controller
{
    public function index()
    {
        return Inertia::render('Elephants/Index', [
            'elephants' => Elephant::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Elephants/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:0',
            'species' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        Elephant::create($validated);
        return redirect()->route('elephants.index')->with('success', 'Elephant created successfully');
    }

    public function show(Elephant $elephant)
    {
        return Inertia::render('Elephants/Show', [
            'elephant' => $elephant
        ]);
    }

    public function edit(Elephant $elephant)
    {
        return Inertia::render('Elephants/Edit', [
            'elephant' => $elephant
        ]);
    }

    public function update(Request $request, Elephant $elephant)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:0',
            'species' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $elephant->update($validated);
        return redirect()->route('elephants.index')->with('success', 'Elephant updated successfully');
    }

    public function destroy(Elephant $elephant)
    {
        $elephant->delete();
        return redirect()->route('elephants.index')->with('success', 'Elephant deleted successfully');
    }
}