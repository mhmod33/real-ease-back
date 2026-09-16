<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Property;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function kpiCard(){
        $totalRevenue=Property::whereIn('status',['sold','rented'])->sum('price');
        $totalClients=Order::distinct('user_id')->count('user_id');
        $realEstateForSale=Property::where('contract_type','sale')->count();

        return response()->json([
            'totalRevenue' => $totalRevenue,
            'totalClients' => $totalClients,
            'realEstateForSale' => $realEstateForSale
        ],200);
    }

    public function lineChartData(){
        $monthlyData = Property::whereIn('status', ['sold', 'rented'])
            ->get(['created_at', 'price'])
            ->groupBy(fn ($property) => $property->created_at->format('Y-m'))
            ->map(fn ($properties, $month) => [
                'month' => $month,
                'Sales' => $properties->count(),
                'totalRevenue' => $properties->sum('price'),
            ])
            ->values();

        return response()->json([
            "message"=>"Monthly data retrieved successfully",
            "data"=>$monthlyData
        ], 200);
    }

    public function topAgents(){
        $topAgents=User::where('role','agent')->
        withCount('agentRatings as total_ratings')->
        withAvg('agentRatings as average_rating','rate')->
        orderByDesc('average_rating')->
        orderByDesc('total_ratings')->
        take(5)->get();
        return response()->json([
            "message"=>"Top agents retrieved successfully",
            'data'=>$topAgents
        ],200);
    }

    public function topProperties(){
        $topProperties=Property::withCount('ratings as total_ratings')->
        withAvg('ratings as average_rating','rate')->
        orderByDesc('average_rating')->
        orderByDesc('total_ratings')->
        take(5)->get();
        return response()->json([
            "message"=>"Top properties retrieved successfully",
            'data'=>$topProperties
        ],200);
    }
}
