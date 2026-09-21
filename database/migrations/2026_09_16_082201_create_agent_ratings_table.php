<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('agent_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('agent_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->decimal('rate', 2, 1);
            $table->text('comment')->nullable();
            $table->timestamps();

            $table->unique(['agent_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('agent_ratings');
    }
};
