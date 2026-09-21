<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AgentRating;
use App\Models\User;
use Illuminate\Http\Request;

class AgentRatingController extends Controller
{
    public function index(User $agent)
    {
        return response()->json([
            'agent' => $agent,
            'data' => $agent->agentRatings()->with('user')->latest()->get(),
        ], 200);
    }

    public function store(Request $request, User $agent)
    {
        if ($agent->agentRatings()->where('user_id', $request->user()->id)->exists()) {
            return response()->json([
                'message' => 'You have already rated this agent.',
            ], 422);
        }

        $validated = $request->validate([
            'rate' => ['required', 'numeric', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string'],
        ]);

        $rating = AgentRating::create([
            ...$validated,
            'agent_id' => $agent->id,
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Agent rated successfully',
            'agent' => $agent,
            'data' => $rating->load(['agent', 'user']),
        ], 201);
    }
}
