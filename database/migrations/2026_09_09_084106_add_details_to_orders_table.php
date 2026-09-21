<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('order_number')->unique();
            $table->enum('status',['pending','cancelled','completed','negotiating'])->default('pending');
            $table->foreignId('property_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  
            $table->foreignId('owner_id')->nullable()->constrained('users')->onDelete('cascade')->after('property_id');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('order_number');
            $table->dropColumn('status');
            $table->dropForeign(['property_id']);
            $table->dropForeign(['user_id']);
            $table->dropForeign(['owner_id']);
        });
    }
};
