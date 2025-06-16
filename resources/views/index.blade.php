@extends('components.layout')
@section('title', 'Premium Web Development Services')
@section('description', 'Professional web development and design services for businesses looking to enhance their online presence.')
@section('robots', 'follow')


@section('content')
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>Transform Your Ideas Into Digital Reality</h1>
            <p>We craft bespoke websites that combine stunning design with cutting-edge technology to elevate your
                online presence and drive business growth.</p>
            <div class="hero-buttons">
                <a href="#contact" class="cta-button">Start Your Project</a>
                <a href="#portfolio" class="secondary-button">View Our Work</a>
            </div>
        </div>
        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Web Development" class="hero-image floating" loading="lazy" width="1470" height="980">
    </section>

    <!-- Services Section -->
    <section class="services" id="services">
        <div class="section-header">
            <h2>Our Premium Services</h2>
            <p>We offer comprehensive web solutions tailored to your unique business needs, ensuring optimal performance
                and user experience.</p>
        </div>
        <div class="services-grid">
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-laptop-code"></i>
                </div>
                <h3>Custom Web Development</h3>
                <p>Bespoke websites built from scratch to perfectly match your brand identity and business requirements
                    with clean, efficient code.</p>
                <a href="#" class="learn-more">Learn more <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-mobile-alt"></i>
                </div>
                <h3>Responsive Design</h3>
                <p>Flawless user experience across all devices with mobile-first approach and adaptive layouts that look
                    stunning on any screen.</p>
                <a href="#" class="learn-more">Learn more <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-rocket"></i>
                </div>
                <h3>Performance Optimization</h3>
                <p>Lightning-fast load times and smooth interactions through advanced optimization techniques for better
                    SEO and user retention.</p>
                <a href="#" class="learn-more">Learn more <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    </section>


    <section class="portfolio" id="portfolio">
        <div class="section-header">
            <h2>Our Recent Projects</h2>
            <p>Explore our portfolio of beautifully crafted websites that deliver exceptional results for our diverse
                clients.</p>
        </div>
        <div class="portfolio-grid">
            @foreach($portfolios as $item)
                <div class="portfolio-item">
                    <img src="{{ url($item->thumbnail) }}" alt="{{ $item->title }}" loading="lazy">
                    <div class="portfolio-overlay">
                        <h3>{{ $item->title }}</h3>
                        <p>{{ $item->description }}</p>
                        <a href="{{ $item->link ?? '#' }}">View Project <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            @endforeach
        </div>
    </section>


    <section class="pricing" id="pricing">
        <div class="section-header">
            <h2>Simple, Transparent Pricing</h2>
            <p>Choose the perfect package for your business needs. All plans include free consultation and support.</p>

            <!-- Category Switcher -->
            <div class="category-switcher">
                <button class="category-btn active" data-category="company">For Companies</button>
                <button class="category-btn" data-category="student">For Students</button>
            </div>
        </div>

        <!-- Company Packages (default visible) -->

        <!-- Company Packages -->
        <div class="pricing-grid company-packages">
            @foreach ($companyPackages as $package)
                @include('packages.partials.card', ['package' => $package])
            @endforeach
        </div>

        <!-- Student Packages -->
        <div class="pricing-grid student-packages" style="display: none;">
            @foreach ($studentPackages as $package)
                @include('packages.partials.card', ['package' => $package])
            @endforeach
        </div>

        <div class="pricing-footer">
            <p>Need something custom? <a href="/contact">Contact us</a> for a tailored solution.</p>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials" id="testimonials">
        <div class="section-header">
            <h2>What Our Clients Say</h2>
            <p>Don't just take our word for it - hear from businesses we've helped transform through our web solutions.
            </p>
        </div>
        <div class="testimonial-slider">
            @foreach ($ratings as $rating)
                <div class="testimonial-slide">
                    <p class="testimonial-content">"{{$rating->feedback}}"</p>
                    <div class="testimonial-author">
                        <img src="https://as2.ftcdn.net/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
                            alt="Sarah Johnson" class="author-avatar" loading="lazy" width="80" height="80">
                        <h4 class="author-name">{{$rating->nama}}</h4>
                        <p class="author-title">{{$rating->company}}</p>
                    </div>
                </div>
            @endforeach

            <div class="slider-controls">
                <div class="slider-dot active" data-slide="0" aria-label="Go to slide 1"></div>
                <div class="slider-dot" data-slide="1" aria-label="Go to slide 2"></div>
                <div class="slider-dot" data-slide="2" aria-label="Go to slide 3"></div>
            </div>
        </div>
    </section>



    <!-- CTA Section -->
    <section class="cta-section" id="contact">
        <h2>Ready to Elevate Your Digital Presence?</h2>
        <p>Let's discuss how we can create a website that not only looks incredible but drives real business results.
        </p>
        <a href="/contact" class="cta-button white">Get Your Free Consultation</a>
    </section>
@endsection