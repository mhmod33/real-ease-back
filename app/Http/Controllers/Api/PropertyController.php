<?php

namespace App\Http\Controllers\Api;

use App\Models\Property;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Api\StorePropertyRequest;
use App\Http\Requests\Api\UpdatePropertyRequest;
use Illuminate\Validation\Validator;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $properties=Property::all();
        $query=Property::query();

        if($request->has('search') && $request->search!=''){
            $search = $request->search;
            $query->where(function($q) use ($search){
                    $q->where('name','like',"%{$search}%")->
                    orwhere('email','like',"%{$search}%")->
                    orwhere('location','like',"%{$search}%")->
                    orwhere('description','like',"%{$search}%");
            });
        }
    
        if($request->has('min_price') && $request->has('max_price') && $request->min_price!='' && $request->max_price!=''){
            $minPrice = $request->min_price;
            $maxPrice = $request->max_price;
            $query->where(function($q) use ($minPrice, $maxPrice){
                    $q->where('price', '>=', $minPrice)->
                    where('price', '<=', $maxPrice);
            });
        }
    

           
        if($request->has('type') && $request->type!=''){
            $query->where('type',$request->type);
        }

        $perPage=$request->get('perPage',10);
        $properties=$query->latest()->paginate($perPage);
        return response()->json([
            'message'=>'Properties retrieved successfully',
            'data'=>$properties->items(),
            'pagination'=>[
                'total'=>$properties->total(),
                'per_page'=>$properties->perPage(),
                'current_page'=>$properties->currentPage()
            ]           
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePropertyRequest $request)
    {   
        $validated=$request->validated();
        $current_user=auth()->user();
        if(
            // $current_user->isAdmin()&&
             $request->filled('user_id')){
            $validated['user_id']=$request->user_id;
        }
        else{
            $validated['user_id']=$current_user;
        }
        $property=Property::create($request->validated());

        
            return response()->json(
                [
                'message' => 'Property created successfully',
                'data' => $property
                ],
                201);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        $property=Property::find($property->id);
        return response()->json([
            'message'=>'',
            'data'=>$property
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePropertyRequest $request, Property $property)
    {
        $property=Property::find($property->id);
        $validated= $request->validated();
        $property->update($validated);
        return response()->json([
            'message'=>'Property updated successfully',
            'data'=>$property
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        $property=Property::find($property->id);
        $property->delete();
        return response()->json([
            'message'=>'Property deleted successfully',
            'data'=>$property
        ],200);
    }
}
