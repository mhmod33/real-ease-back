<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePropertyRequest extends FormRequest
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
            'name'=>'required|string|max:255',
            'description'=>'string|max:255',
            'price'=>'required|numeric',
            'features'=>'array|nullable',
            'location'=>'string|nullable',
            'type'=>'string|in:apartment,house,condo,land,commercial,other',
            'contract_type'=>'string|in:sale,rent',
            'status'=>'string|in:available, sold, pending, rented',
            'image'=>'string|nullable',
            'images'=>'array|nullable',
            'user_id'=>'nullable|exists:users,id'
        ];
    }
}
