<?php

declare(strict_types=1);

namespace SamuelMwangiW\Africastalking\Domain;

class Payment
{
    public function mobileCheckout(): MobileCheckout
    {
        return app(MobileCheckout::class);
    }
}
