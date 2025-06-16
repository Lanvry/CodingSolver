<div class="pricing-card {{ $package->is_recommended ? 'recommended' : '' }}">
    <div class="pricing-header">
        <h3>{{ $package->name }}</h3>
        <div class="price">
            <span class="currency">Rp</span>
            <span class="amount">{{ number_format($package->price, 0, ',', '.') }}</span>
            <span class="period">one-time</span>
        </div>
        @if ($package->badge)
            <badge class="badge">{{ $package->badge }}</badge>
        @endif
        <p class="description">{{ $package->tagline }}</p>
    </div>
    <ul class="features">
        @foreach ($package->features as $feature)
            <li><i class="fas fa-check"></i> {{ $feature['value'] ?? '' }}</li>
        @endforeach

    </ul>
    <a href="/order/{{$package->id}}" class="cta-button {{ $package->is_recommended ? '' : 'outline' }}">Get Started</a>
    <div class="popular-tag">
        {{ $package->is_recommended ? 'Popular Choice' : ($package->category === 'student' ? 'Student Special' : 'Most Affordable') }}
    </div>
</div>