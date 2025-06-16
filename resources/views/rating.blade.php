<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rating - Coding Solver</title>
    <link rel="shortcut icon" href="{{ url('img/favicon.ico') }}" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="{{ url('css/success.css') }}">
    <style>
        .rating-stars {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin: 20px 0;
            font-size: 2rem;
        }

        .rating-stars i {
            cursor: pointer;
            color: #ccc;
            transition: color 0.3s;
        }

        .rating-stars i.selected,
        .rating-stars i:hover,
        .rating-stars i.hovered {
            color: #f39c12;
        }

        textarea {
            width: 100%;
            border-radius: 10px;
            padding: 10px;
            font-size: 1rem;
            resize: vertical;
            border: 1px solid #ccc;
        }
        textarea {
            width: 100%;
            border-radius: 10px;
            padding: 10px;
            font-size: 1rem;
            resize: vertical;
            border: 1px solid #ccc;
        }

        input[type="text"]{
            width: 100%;
            border-radius: 10px;
            padding: 10px;
            font-size: 1rem;
            border: 1px solid #ccc;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-width: 500px;
            margin: auto;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="success-container">
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
            <i class="fas fa-moon"></i>
        </button>
        <div class="success-icon">
            <i class="fas fa-star"></i>
        </div>

        <h1>Berikan Penilaianmu</h1>
        <p>Bagaimana pengalaman Anda dengan pesanan ini?</p>

        <form method="POST" action="{{ route('rating.submit') }}">
            @csrf
            <div class="rating-stars" id="starContainer">
                @for($i = 1; $i <= 5; $i++)
                    <i class="fas fa-star" data-value="{{ $i }}"></i>
                @endfor
            </div>

            <input type="hidden" name="rating" id="ratingValue">
            <input type="text" name="nama" placeholder="Nama Lengkap" id="">
            <input type="text" name="company" placeholder="Masukkan Nama Perusahaan/Bisnis/Nama Website" id="">
            <textarea name="feedback" rows="4" placeholder="Tulis komentar Anda..."></textarea>

            <button type="submit" class="btn btn-primary">Kirim Penilaian</button>
            <a href="{{ url('/') }}" class="btn btn-outline">Kembali ke Beranda</a>
        </form>
    </div>

    <script>
        const stars = document.querySelectorAll('#starContainer i');
        const ratingInput = document.getElementById('ratingValue');

        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                ratingInput.value = index + 1;
                updateStars(index + 1);
            });

            star.addEventListener('mouseover', () => {
                highlightStars(index + 1);
            });

            star.addEventListener('mouseout', () => {
                highlightStars(ratingInput.value);
            });
        });

        function updateStars(rating) {
            stars.forEach((s, i) => {
                s.classList.toggle('selected', i < rating);
            });
        }

        function highlightStars(rating) {
            stars.forEach((s, i) => {
                s.classList.toggle('hovered', i < rating);
            });
        }
    </script>
</body>

</html>
