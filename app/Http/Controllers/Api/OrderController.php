<?php

namespace App\Http\Controllers\Api;
use App\Models\Order;
use App\Models\Property;
use App\Http\Resources\OrderResource;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreOrderRequest;
use App\Http\Requests\Api\UpdateOrderRequest;
class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query=Order::with(['property','user']);
        
        if($request->has('order_number') && ($request->order_number!='')){
            $query->where('order_number',$request->order_number);
            }
        if($request->has('property_id') && ($request->property_id!='')){
            $query->where('property_id',$request->property_id);
        }
            
        $orders=$query->get();

        return response()->json([
            "message"=>"Orders retrieved successfully",
            "data"=>OrderResource::collection($orders)
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

    if (
        // $currentUser->isAdmin() &&
     $request->filled('user_id')) {
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

    public function getTotalClients(){
        // $orders=Order::with(['property','user'])->get();
        $totalClients=Order::select('owner_id')->distinct()->count('owner_id');
        return response()->json([
            'message' => 'Total clients retrieved successfully',
            'data' => $totalClients
        ], 200);
    }
    public function getTotalPrice(){
        // $orders=Order::with(['property','user'])->get();
        $totalPrice=Order::with('property')->get()->sum(function($order){
            return $order->property->price;
        });
        return response()->json([
            'message' => 'Total transactions retrieved successfully',
            'data' => $totalPrice
        ], 200);
    }
    public function getOrdersByUserId($userId)
    {
        $orders = Order::where('user_id', $userId)->with(['property', 'owner'])->get();

        if ($orders->isEmpty()) {
            return response()->json([
                'message' => 'No orders found for this user',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'Orders retrieved successfully',
            'data' => OrderResource::collection($orders)
        ], 200);
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
    public function changeStatus(Request $request, Order $order){
        $order=Order::find($order->id);
        $order->update(['status'=>$request->status]);
        return response()->json([
            "message"=>"status changed successfully",
            "data"=>$order
        ]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order=Order::find($order->id);
        if(!$order){
            return response()->json([
                "Message"=>"this order not found",
            ],404);
        }
        $order->delete();
        return response()->json([
            'message'=>'Order deleted successfully',
            'data'=>$order
        ],200);
    }
   public function deleteMultipleOrders(Request $request)
{
    $request->validate([
        'ids' => 'required|array',
        'ids.*' => 'exists:orders,id'
    ]);

    Order::whereIn('id', $request->ids)->delete();

    return response()->json([
        'message' => 'Orders deleted successfully'
    ], 200);
}
}
