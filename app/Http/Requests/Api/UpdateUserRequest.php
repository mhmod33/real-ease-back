<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=>'sometimes|required|string|max:255',
            'email'=>'sometimes|required|string|email|max:255|unique:users',
            'password'=>'sometimes|required|string|min:8',
            'google_id'=>'nullable|string',
            'role'=>'nullable|string',
            'type'=>'nullable|string',
            'age'=>'nullable|integer',
            'gender'=>'nullable|string',
            'agency'=>'nullable|string',
            'location'=>'nullable|string',
            'description'=>'nullable|string',
        ];
    }
    public function messages(): array
    {
        return 
        [
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'email.email' => 'Email must be a valid email address',
            'email.unique' => 'Email has already been taken',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 8 characters',
            'age.integer' => 'Age must be an integer',
            'string'=>'The :attribute must be a string',
            'gender.in' => 'Gender must be either male or female',
        ];
    }
}
