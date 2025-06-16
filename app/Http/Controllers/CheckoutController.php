<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    //

    public function store(Request $request)
    {
        $request->validate([
            'package_id' => 'required|exists:packages,id',
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'address' => 'required',
            'payment_method' => 'required',
            'terms' => 'accepted',
        ]);

        $order = Checkout::create([
            'order_id' => 'ORD-' . strtoupper(Str::random(8)),
            'package_id' => $request->package_id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'company' => $request->company,
            'address' => $request->address,
            'notes' => $request->notes,
            'payment_method' => $request->payment_method,
            'status' => 'pending',
        ]);

        return redirect()->route('checkout.success', $order->order_id);
    }

    public function success($order_id)
    {
       $checkout = Checkout::with('package')->where('order_id', $order_id)->firstOrFail();
    return view('checkout.success', compact('checkout'));
    }
}
