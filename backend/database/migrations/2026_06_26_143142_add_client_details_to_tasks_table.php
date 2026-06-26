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
        Schema::table('tasks', function (Blueprint $table) {
            $table->string('client_name')->nullable();
            $table->string('client_contact')->nullable();
            $table->string('progress')->default('planning'); // e.g., planning, development, testing, completed
            $table->decimal('income', 15, 2)->default(0);
            $table->text('requirements')->nullable();
            $table->text('report')->nullable();
            $table->date('deadline')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn(['client_name', 'client_contact', 'progress', 'income', 'requirements', 'report', 'deadline']);
        });
    }
};
