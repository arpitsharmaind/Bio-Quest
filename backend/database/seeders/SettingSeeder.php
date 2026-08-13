<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // Contact section header
            'contact_tag' => 'Get In Touch',
            'contact_title' => 'Contact Us',
            'contact_subtitle' => "Have a question or want to work together? We'd love to hear from you.",

            // Info card 1 — office
            'contact_office_title' => 'Our Office',
            'contact_office_text' => "A-902, RIICO Industrial Area,\nBhiwadi, Rajasthan 301019, India",

            // Info card 2 — phone
            'contact_phone_title' => 'Call Us',
            'contact_phone_text' => "+91-1493-234 100\n+91-1493-234 200",

            // Info card 3 — email
            'contact_email_title' => 'Email Us',
            'contact_email_text' => "info@titanbiotech.com\nsales@titanbiotech.com",

            // Info card 4 — hours
            'contact_hours_title' => 'Working Hours',
            'contact_hours_text' => "Mon – Sat: 9:00 AM – 6:00 PM\nSunday: Closed",
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => 'contact'],
            );
        }
    }
}
