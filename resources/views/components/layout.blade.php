<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coding Solver - @yield('title', 'Premium Web Development & Design Services')</title>
    <meta name="description"
        content="@yield('description', 'Professional web development and design services for businesses looking to enhance their online presence.')">
    <meta name="robots" content="index, @yield('robots', 'follow')">
    <meta name="keywords" content="web development, web design, responsive design, custom websites, SEO optimization, Coding Solver, CodingSolver, Website">
    <meta name="author" content="Coding Solver">

    <!-- Open Graph / Social Media Meta Tags -->
    <meta property="og:title" content="Coding Solver -  @yield('title', 'Premium Web Development & Design Services')">
    <meta property="og:site_name" content="Coding Solver">
    <meta property="og:description"
        content="Professional web development and design services for businesses looking to enhance their online presence.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.codingsolver.com">
    <meta property="og:image" content="https://www.codingsolver.com/images/og-image.jpg">

    <!-- Favicon -->
    <link rel="icon" href="img/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.codingsolver.com">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Preload important resources -->
    <link rel="preload"
        href="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        as="image">
    <link rel="stylesheet" href="./css/style.css">
</head>

<body>
    <!-- Navigation -->
    <x-navbar></x-navbar>

    @yield('content')

    <!-- Footer -->
    <x-footer></x-footer>
    <script src="./js/script.js"></script>

    <!-- Structured data for SEO -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Coding Solver",
      "image": "https://www.codingsolver.com/images/logo.jpg",
      "@id": "https://www.codingsolver.com",
      "url": "https://www.codingsolver.com",
      "telephone": "+15551234567",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Web Street",
        "addressLocality": "Digital City",
        "postalCode": "10001",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 40.7128,
        "longitude": -74.0060
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      "sameAs": [
        "https://www.facebook.com/codingsolver",
        "https://www.twitter.com/codingsolver",
        "https://www.instagram.com/codingsolver",
        "https://www.linkedin.com/company/codingsolver"
      ]
    }
    </script>
</body>

</html>