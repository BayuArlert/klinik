<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ForgotPasswordTest extends TestCase
{
    use RefreshDatabase;

    public function test_forgot_password_screen_can_be_rendered(): void
    {
        $response = $this->get('/forgot-password');

        $response->assertStatus(200);
    }

    public function test_user_can_reset_password_without_email_confirmation(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@kliniksehat.com',
            'password' => Hash::make('password-lama'),
        ]);

        $response = $this->post('/forgot-password', [
            'email' => 'admin@kliniksehat.com',
            'password' => 'new-password-123',
            'password_confirmation' => 'new-password-123',
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHas('status');

        $this->assertTrue(Hash::check('new-password-123', $user->fresh()->password));
    }

    public function test_forgot_password_fails_if_email_not_registered(): void
    {
        $response = $this->post('/forgot-password', [
            'email' => 'tidakada@kliniksehat.com',
            'password' => 'new-password-123',
            'password_confirmation' => 'new-password-123',
        ]);

        $response->assertSessionHasErrors('email');
    }
}
