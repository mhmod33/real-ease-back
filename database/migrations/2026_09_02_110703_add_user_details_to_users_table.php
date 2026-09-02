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
        Schema::table('users', function (Blueprint $table) {
            $table->string('type')->nullable()->after('role');
            $table->integer('age')->nullable()->after('type');
            $table->enum('gender', ['male', 'female'])->nullable()->after('age');
            $table->string('agency')->nullable()->after('gender');
            $table->string('location')->nullable()->after('agency');
            $table->text('description')->nullable()->after('location');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('type');
            $table->dropColumn('age');
            $table->dropColumn('gender');
            $table->dropColumn('agency');
            $table->dropColumn('location');
            $table->dropColumn('description');
        });
    }
};
