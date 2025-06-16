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
          Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('price');
            $table->json('features');
            $table->string('category'); // example: student / company
            $table->boolean('is_recommended')->default(false);
            $table->string('badge')->nullable(); // Laravel / PHP Native
            $table->string('tagline')->nullable();
            $table->integer('revisions')->default(0);
            $table->string('support_duration')->nullable(); // "2 weeks", "3 months"
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
