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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->decimal('price', 10, 2);
            $table->json('features')->nullable();
            $table->text('description')->nullable();
            $table->string('location')->nullable();
            $table->enum('type', ['apartment', 'house', 'condo', 'land', 'commercial', 'other'])->default('apartment');
            $table->enum('contract_type', ['sale', 'rent'])->default('sale');
            $table->enum('status', ['available', 'sold', 'pending', 'rented'])->default('available');
            $table->string('image')->nullable();
            $table->json('images')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
