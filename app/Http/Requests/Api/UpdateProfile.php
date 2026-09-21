<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfile extends FormRequest
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
            'type'=>'nullable|string',
            'age'=>'nullable|integer',
            'gender'=>'nullable|string',
            'agency'=>'nullable|string',
            'location'=>'nullable|string',
            'description'=>'nullable|string',
            'social_media'=>'nullable|array',
            'phone'=>'nullable|string|max:30',
            'whatsapp_phone'=>'nullable|string|max:30',
            'personal_website'=>'nullable|url|max:255',
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
            'social_media.array' => 'Social media must be valid JSON',
            'phone.string' => 'Phone must be a string',
            'whatsapp_phone.string' => 'WhatsApp phone must be a string',
            'personal_website.url' => 'Personal website must be a valid URL',
        ];
    }
}
