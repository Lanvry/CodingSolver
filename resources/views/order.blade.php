<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout - Coding Solver</title>
    <link rel="shortcut icon" href="{{url('img/favicon.ico')}}" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="{{ url('css/order.css') }}">
</head>

<body>
    <div class="container">
        <div class="checkout-header">
            <button class="theme-toggle invisible" id="themeToggle" aria-label="Toggle dark mode">
                <i class="fas fa-moon"></i>
            </button>
            <h1>Complete Your Order</h1>
            <p>Please fill in your details to complete the purchase</p>
        </div>

        <div class="checkout-grid">
            <!-- Order Summary Section -->
            <div class="order-summary">
                <h2>Order Summary</h2>

                <div class="package-details">
                    <div class="package-info">
                        <h3 id="package-name">{{$package->name}}</h3>
                        <p class="package-type" id="package-type">{{ $package->category }}</p>
                    </div>
                    <div class="package-price" id="package-price">Rp{{ number_format($package->price, 0, ',', '.') }}
                    </div>
                </div>

                <ul class="features-list" id="features-list">
                    @foreach ($package->features as $feature)
                        <li><i class="fas fa-check"></i> {{ $feature['value'] ?? '' }}</li>
                    @endforeach
                </ul>

                @php
                    $price = $package->price;
                    $tax = $price * 0.01;
                    $total = $price + $tax;
                @endphp

                <div class="total-section">
                    <div class="total-row">
                        <span>Subtotal</span>
                        <span id="subtotal">Rp{{ number_format($price, 0, ',', '.') }}</span>
                    </div>
                    <div class="total-row">
                        <span>Tax (1%)</span>
                        <span id="tax">Rp{{ number_format($tax, 0, ',', '.') }}</span>
                    </div>
                    <div class="total-row total">
                        <span>Total</span>
                        <span id="total">Rp{{ number_format($total, 0, ',', '.') }}</span>
                    </div>
                </div>

            </div>

            <!-- Checkout Form Section -->
            <div class="checkout-form">
                <h2>Billing Information</h2>

                <form action="{{ route('checkout.store') }}" method="POST">
                    @csrf
                    <input type="hidden" name="package_id" value="{{ $package->id }}">

                    <div class="form-row">
                        <div class="form-group">
                            <label for="first-name">First Name</label>
                            <input type="text" id="first-name" name="first_name" required>
                        </div>
                        <div class="form-group">
                            <label for="last-name">Last Name</label>
                            <input type="text" id="last-name" name="last_name" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>

                    <div class="form-group">
                        <label for="company">Company Name (Optional)</label>
                        <input type="text" id="company" name="company">
                    </div>

                    <div class="form-group">
                        <label for="address">Address</label>
                        <textarea id="address" name="address" rows="3" required></textarea>
                    </div>

                    <div class="form-group">
                        <label for="notes">Project Notes (Optional)</label>
                        <textarea id="notes" name="notes" rows="3"></textarea>
                    </div>

                    <div class="payment-methods">
                        <h3>Payment Method</h3>
                        <div class="payment-method">
                            <input type="radio" id="ewallet" name="payment_method" value="ewallet" required>
                            <label for="ewallet">
                                <i class="fas fa-wallet"></i>
                                <div class="payment-info">
                                    <h4>E-Wallet</h4>
                                    <p>OVO, GoPay, Dana, etc.</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div class="terms-checkbox">
                        <input type="checkbox" id="terms" name="terms" required>
                        <label for="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy
                                Policy</a></label>
                    </div>

                    <button type="submit" class="submit-btn">Complete Order</button>
                </form>
            </div>
        </div>
    </div>

    <!-- Success Modal -->
    <div class="modal-overlay" id="successModal">
        <div class="modal-content">
            <i class="fas fa-check-circle"></i>
            <h2>Order Successful!</h2>
            <p>Thank you for your purchase. We've sent the payment details to your email address.</p>
            <button class="modal-btn" id="modalClose">Back to Home</button>
        </div>
    </div>

    <script src="{{url('js/script.js')}}"></script>
    <script>
        localStorage.setItem("OrderStatus", "On Progress");
    </script>

</body>

</html>