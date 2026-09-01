<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function login (Request $request){
        $validator =Validator::make($request->all(),[
            'id_token'=>'required|string',
        ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'الـ id_token مطلوب',
                'errors' => $validator->errors(),
            ],422);
        }
        try {
            $googleUser = Socialite::driver('google-one-tap')
            ->userFromToken($request->id_token);
    
        } catch (Exception $e) {
            return response()->json([
                'message' => 'فشل التحقق من Google',
                'error' => $e->getMessage(),
            ], 500);
        }

        $user = User::where('google_id', $googleUser->getId())
            ->orWhere('email', $googleUser->getEmail())
            ->first();

        if ($user) {
            if (!$user->google_id) {
                $user->update([
                    'google_id' => $googleUser->getId(),
                ]);
            }
        } else {
            $user = User::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'google_id' => $googleUser->getId(),
                'password' => Str::random(24), 
                'email_verified_at' => now(), 
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'تم تسجيل الدخول بنجاح',
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}
