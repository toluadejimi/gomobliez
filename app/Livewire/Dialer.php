<?php

namespace App\Livewire;

use Livewire\Component;

class Dialer extends Component
{
    public $phone_number = '';
    
    public function render()
    {
        return view('livewire.dialer');
    }
}
