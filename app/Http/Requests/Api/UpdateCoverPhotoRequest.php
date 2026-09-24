<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCoverPhotoRequest extends FormRequest
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
            'cover_photo' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ];
    }

    public function messages(): array
    {
        return [
            'cover_photo.required' => 'A cover photo is required.',
            'cover_photo.image'    => 'The cover photo must be an image.',
            'cover_photo.mimes'    => 'The cover photo must be a jpeg, png, jpg, gif, or webp file.',
            'cover_photo.max'      => 'The cover photo may not be larger than 5MB.',
        ];
    }
}
