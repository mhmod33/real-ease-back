<?php

namespace App\Http\Controllers\Api;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreOrderRequest;
use App\Http\Requests\Api\UpdateOrderRequest;
class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders=Order::all();
        return response()->json([
            "message"=>"Orders retrieved successfully",
            "data"=>$orders
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
{
    $property = Property::findOrFail($request->property_id);

    if ($property->status !== 'available') {
        return response()->json([
            'message' => 'Property is not available',
        ], 400);
    }

    $validated = $request->validated();
    $currentUser = auth()->user();

    if ($currentUser->isAdmin() && $request->filled('user_id')) {
        $validated['user_id'] = $request->user_id;
    } else {
        $validated['user_id'] = $currentUser->id;
    }

    $validated['owner_id'] = $property->user_id;

    $order = Order::create($validated);

    $property->update(['status' => 'pending']);

    return response()->json([
        'message' => 'Order created successfully',
        'data' => $order,
    ], 201);
    

    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order=Order::find($order->id);
        if(!$order){
            return response()->json([
                "message"=>"Order not found"
            ],404);
        }
        return response()->json([
            "message"=>"Order retrieved successfully",
            "data"=>new OrderResource($order)
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
