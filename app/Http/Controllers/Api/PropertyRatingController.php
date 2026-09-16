<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyRatingController extends Controller
{
    public function index(Property $property)
    {
        return response()->json([
            'data' => $property->ratings()->with('user')->latest()->get(),
        ], 200);
    }

    public function store(Request $request, Property $property)
    {
        if ($property->ratings()->where('user_id', $request->user()->id)->exists()) {
            return response()->json([
                'message' => 'You have already rated this property.',
            ], 422);
        }

        $validated = $request->validate([
            'rate' => ['required', 'numeric', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string'],
        ]);

        $rating = $property->ratings()->create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        $property->update([
            'rate' => $property->ratings()->avg('rate'),
        ]);

        return response()->json([
            'message' => 'Property rated successfully',
            'data' => $rating->load('user'),
            'property_rate' => $property->rate,
        ], 201);
    }
}
