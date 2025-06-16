<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Success - Coding Solver</title>
    <link rel="shortcut icon" href="{{url('img/favicon.ico')}}" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="{{ url('css/success.css') }}">
</head>

<body>
    <div class="success-container">
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
            <i class="fas fa-moon"></i>
        </button>
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>

        <h1>Order Successful!</h1>
        <p>Thank you for your order. We will contact you soon for the continuation of the website.</p>

        <div class="order-details">
            <h3>Order Summary</h3>
            <div class="detail-row">
                <span class="detail-label">Order ID:</span>
                <span class="detail-value">{{ $checkout->order_id }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Package:</span>
                <span class="detail-value">{{ $checkout->package->name }}</span>
            </div>
            @php
                $price = $checkout->package->price;
                $tax = $price * 0.01;
                $total = $price + $tax;
            @endphp
            <div class="detail-row">
                <span class="detail-label">Amount Paid:</span>
                <span class="detail-value">Rp{{ number_format($total, 0, ',', '.') }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Payment Method:</span>
                <span class="detail-value">{{ ucfirst($checkout->payment_method) }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">{{ $checkout->created_at->format('d M Y H:i') }}</span>
            </div>
        </div>



        <div class="action-buttons">
            <a href="https://wa.me/+6285730426264" class="btn btn-primary">Contact Me</a>
            <a href="{{ url('/') }}" class="btn btn-outline">Back to Home</a>
        </div>
    </div>
    <script src="{{url('js/script.js')}}"></script>
    <script>
        // Ambil data dari Laravel Blade
        const orderId = "{{ $checkout->order_id }}";
        const packageName = "{{ $checkout->package->name }}";
        const name = "{{ $checkout->first_name }} {{ $checkout->last_name }}";
        const email = "{{ $checkout->email }}";
        const phone = "{{ $checkout->phone }}";
        const address = "{{ $checkout->address }}";
        const amountPaid = "Rp{{ number_format($total, 0, ',', '.') }}";
        const paymentMethod = "{{ ucfirst($checkout->payment_method) }}";
        const orderDate = "{{ $checkout->created_at->format('d M Y H:i') }}";

        const fullMessage =
            `✅ *Order Baru Berhasil!*\n\n` +
            `🆔 *Order ID:* ${orderId}\n` +
            `👤 *Nama:* ${name}\n` +
            `📧 *Email:* ${email}\n` +
            `📱 *Telepon:* ${phone}\n` +
            `🏠 *Alamat:* ${address}\n\n` +
            `📦 *Paket:* ${packageName}\n` +
            `💰 *Jumlah Dibayar:* ${amountPaid}\n` +
            `💳 *Metode Pembayaran:* ${paymentMethod}\n` +
            `🗓️ *Tanggal:* ${orderDate}\n\n` +
            `🚀 Segera hubungi klien untuk proses lanjutan.`;


        const token = "eNF5Ugn2HWGBcrbDUyx2"; // Ganti dengan token asli kamu dari Fonnte
        const target = "6285648077829"; // Ganti dengan nomor kamu, tanpa +

        const formData = new FormData();
        formData.append("target", target);
        formData.append("message", fullMessage);
        formData.append("countryCode", "62");

        if (localStorage.getItem('OrderStatus') !== 'Success') {
            fetch("https://api.fonnte.com/send", {
                method: "POST",
                headers: {
                    "Authorization": token
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === true || data.status === "true") {
                        console.log("Pesan berhasil dikirim ke WhatsApp!");
                        localStorage.setItem('OrderStatus', 'Success');
                    } else {
                        console.error("Gagal mengirim pesan:", data);
                    }
                })
                .catch(error => console.error("Error:", error));
        }

    </script>

</body>

</html>