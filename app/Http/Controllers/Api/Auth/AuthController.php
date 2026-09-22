<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\Api\StoreUserRequest;
use App\Http\Requests\Api\UpdateUserRequest;
use App\Http\Requests\Api\LoginRequest;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
    public function register(StoreUserRequest $request)
    {
        $validatedData=$request->validated();
        $user=User::create($validatedData);
        if($user){
            $token=$user->createToken('auth_token')->plainTextToken;
            return response()->json(
                [
                'message' => 'User registered successfully',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'data' => $user
                ],
                201);
        }
        else{
            return response()->json(
                [
                'message' => 'User registration failed',
                ],
                400);
        }

    }

    public function login(LoginRequest $request){
        $user= User::where('email',$request->email)->first();
        if(!$user || !Hash::check($request->password,$user->password)){
            return response()->json([
                'Message'=>'Invalid credentials'
            ],401);
        }
        else{
            $token=$user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
            ]);
        }
    }
    public function logout(Request $request){
        $token=$request->user()->currentAccessToken();
        if($token){
            $token->delete();
        }
        return response()->json([
            'Message'=>'Logout successful'
        ],200);
    }
}
