<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreUserRequest;
use App\Http\Requests\Api\UpdateUserRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json(
            [
            'message' => 'Users retrieved successfully',
            'data' => $users
            ],
            200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $validated =$request->validated();
        $user = User::create($validated);
        if($user){
            return response()->json(
                [
                'message' => 'User created successfully',
                'data' => $user
                ],
                201);
        }
        else{
            return response()->json(
                [
                'message' => 'User creation failed',
                ],
                400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user=User::find($user->id);
        if($user){
            return response()->json(
                [
                'message' => 'User retrieved successfully',
                'data' => $user
                ],
                200);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user=User::find($user->id);
        $validated =$request->validated();
        if($user){
            $user->update($validated);
            return response()->json(
                [
                'message' => 'User updated successfully',
                'data' => $user
                ],
                200);
        }
        else{
            return response()->json(
                [
                'message' => 'User not found',
                ],
                404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user=User::find($user->id);
        if($user){
            $user->delete();
            return response()->json(
                [
                'message' => 'User deleted successfully',
                ],
                200);
        }
        else{
            return response()->json(
                [
                'message' => 'User not found',
                ],
                404);
        }
    }
}
