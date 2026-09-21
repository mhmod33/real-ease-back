<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMessageRequest extends FormRequest
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
            'property_id' =>['sometimes','exists:properties,id'],
            'receiver_id' =>['sometimes','exists:users,id'],
            'sender_id' =>['sometimes','exists:users,id'],
            'message' =>['sometimes','string'],
            'read_at'=>['sometimes,datetime']

        ];
    }
}
