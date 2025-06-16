<?php

use App\Http\Controllers\CheckoutController;
use App\Models\Package;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [IndexController::class, 'index']);


Route::get('/contact', function () {
    return view('contact');
});


Route::get('/order/{id}', function ($id) {
    $package = Package::findOrFail($id);
    return view('order', compact('package'));
})->name('order');
Route::get('/rating', function () {
    return view('rating');
})->name('rating');
Route::post('/rating', [\App\Http\Controllers\RatingController::class, 'store'])->name('rating.submit');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/checkout/success/{order_id}', [CheckoutController::class, 'success'])->name('checkout.success');
Route::get('/portfolios/{filename}', function ($filename) {
    $path = storage_path('app/public/portfolios/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    $mime = mime_content_type($path);
    return response()->file($path, ['Content-Type' => $mime]);
})->name('portfolio.image');
