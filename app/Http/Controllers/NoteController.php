<?php

namespace App\Http\Controllers;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{

    public function index(){
        $notes = Note::all();
        return response()->json(['message' => 'notas en la tabla', 'nota' => $notes]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'label' => 'nullable|string|max:50',
            'user_id' => 'required|exists:users,id', 
        ]);

        $note = Note::create($validated);
        return response()->json(['message' => 'Nota creada exitosamente', 'note' => $note], 201);
    }


    public function update(Request $request, $id)
    {
        $note = Note::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'label' => 'nullable|string|max:50',
        ]);
    
        $note->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'label' => $validated['label'],
        ]);
    
        return response()->json(['message' => 'nota actualizada exitosamente', 'nota' => $note], 200);
    }


    public function show($id)
    {
        $note = Note::findOrFail($id);
        return response()->json(['message' => 'nota encontrada exitosamente', 'note' => $note], 200);
    }

    public function destroy($id)
    {

        $note = Note::find($id);
        if (!$note) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        $note->delete();
        return response()->json(['message' => 'nota eliminada exitosamente'], 200);
    }
}
